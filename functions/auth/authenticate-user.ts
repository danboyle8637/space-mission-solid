import type { PagesFunction } from "@cloudflare/workers-types";
import type {
  Env,
  AuthenticateCurrentMemberBody,
  StytchAuthenticateBody,
  StytchAuthenticateRes,
  UserKVDoc,
} from "../../src/types/api";
import { getErrorMessage } from "../../src/utils/helpers";

// Needs to be a post request
export const onRequest: PagesFunction<Env> = async (context) => {
  const request = context.request;

  const formattedReq = new Response(request.body);
  const body: AuthenticateCurrentMemberBody = await formattedReq.json();
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
        Authenticate: `Basic ${encodedUserPassword}`,
      },
      body: JSON.stringify(body),
    });

    const authData: StytchAuthenticateRes = await authRes.json();
    const userId = authData.user_id;
    const sessionToken = authData.session_token;
    const expiresAt = authData.session.expires_at;
    const confirmPhoneId = authData.user.phone_numbers.find(
      (p) => p.phone_id === phoneId
    );

    const userKVDoc: UserKVDoc = {
      userId: userId,
      phoneId: confirmPhoneId.phone_id,
      sessionToken: sessionToken,
      expiresAt: expiresAt,
    };

    const uuid = crypto.randomUUID();

    await context.env.SPACE_MISSION_SESSIONS.put(
      uuid,
      JSON.stringify(userKVDoc)
    );

    const cookieHeader = `session-token=${uuid}; SameSite=Lax; Path=/api; Secure; HttpOnly`;

    const testUrl = "/test";
    const actionUrl = "/get-user";

    // ! THIS IS THE TEST
    const saveUserReq = new Request(testUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        user: userId,
        "Set-Cookie": cookieHeader,
      },
    });

    const userResponse = await context.env.USER_WORKER.fetch(saveUserReq);
    userResponse.headers.set("Set-Cookie", cookieHeader);

    return userResponse;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
};
