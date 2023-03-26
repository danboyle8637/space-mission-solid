import type { PagesFunction } from "@cloudflare/workers-types";
import type {
  Env,
  AuthenticateNewMemberBody,
  StytchAuthenticateBody,
  StytchAuthenticateRes,
  UserSessionReqBody,
} from "../../src/types/api";
import { getErrorMessage } from "../../src/utils/helpers";

export const onRequest: PagesFunction<Env> = async (context) => {
  const request = context.request;

  const formattedReq = new Response(request.body);
  const body: AuthenticateNewMemberBody = await formattedReq.json();
  const { phoneId, code } = body;

  if (!phoneId || !code) {
    const response = new Response("Bad Request", { status: 500 });
    return response;
  }

  try {
    const stytchAuthUrl = "https://test.stytch.com/v1/otps/authenticate";

    const stytchId = context.env.STYTCH_PROJECT_ID;
    const stytchSecret = context.env.STYTCH_SECRET;

    const body: StytchAuthenticateBody = {
      method_id: phoneId,
      code: code,
      session_duration_minutes: 10080,
    };

    const userPassword = `${stytchId}:${stytchSecret}`;
    const encodedUserPassword = btoa(userPassword);

    const authRes = await fetch(stytchAuthUrl, {
      method: "POST",
      headers: {
        "Content-Type": "appalication/json",
        Authorization: `Basic ${encodedUserPassword}`,
      },
      body: JSON.stringify(body),
    });

    if (authRes.status !== 200) {
      const errorMessage = await authRes.text();
      const response = new Response(`Failed to verify phone: ${errorMessage}`, {
        status: 500,
      });
      return response;
    }

    const authData: StytchAuthenticateRes = await authRes.json();
    const userId = authData.user_id;
    const sessionToken = authData.session_token;
    const sessionId = authData.session.session_id;
    const expiresAt = authData.session.expires_at;
    const confirmPhoneId = authData.user.phone_numbers.find(
      (p) => p.phone_id === phoneId
    );

    const uuid = crypto.randomUUID();

    const userSession: UserSessionReqBody = {
      uuid: uuid,
      userId: userId,
      phoneId: confirmPhoneId.phone_id,
      sessionToken: sessionToken,
      sessionId: sessionId,
      expiresAt: expiresAt,
    };

    const sessionUrl = `${context.env.USER_WORKER_DEV}/create-dev-session`;

    const userSessionRes = await fetch(sessionUrl, {
      method: "POST",
      body: JSON.stringify(userSession),
    });

    if (userSessionRes.status !== 200) {
      const errorMessage = await userSessionRes.text();
      throw new Error(errorMessage);
    }

    const cookieExpiresAt = 1000 * 60 * 60 * 24;

    const cookieHeader = `dev-session-token=${uuid}; SameSite=Lax; Path=/dev-api; Secure; HttpOnly; Max-Age=${cookieExpiresAt}`;

    const response = new Response("Authenticated", { status: 200 });
    response.headers.set("Set-Cookie", cookieHeader);

    return response;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
};
