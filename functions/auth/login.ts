import { PagesFunction } from "@cloudflare/workers-types";

import { getErrorMessage } from "../../src/utils/helpers";
import type { Env, LoginEmailReqBody } from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const request = context.request;
  const userRequest = request.clone();

  // 1. Get the body of the request
  // 2. Hit Stytch to log user in and get session
  // 3. Get user info from database
  // 4. Store session in KV with TTL
  // 5. Return the user to the app

  // 6. Add in social logins so you can get that data as well.
  const formattedReq = new Response(request.body);
  const body: LoginEmailReqBody = await formattedReq.json();
  const { emailAddress } = body;

  if (!emailAddress) {
    const response = new Response("Bad Request", { status: 400 });
    return response;
  }

  try {
    if (emailAddress === "dan@dan.com") {
      const stytchUrl =
        "https://test.stytch.com/v1/magic_links/email/login_or_create";

      const token = "123456";
      const cookieHeader = `session-token=${token}; SameSite=Lax; Path=/api; Secure; HttpOnly`;

      // await context.env.SPACE_MISSION_SESSIONS.put(token, JSON.stringify({
      //   user: 123456
      // }))
      const userResponse = await context.env.USER_WORKER.fetch(userRequest);
      userResponse.headers.set("Set-Cookie", cookieHeader);
      return userResponse;
    }

    return new Response("You're Not Allowed In Just Yet");
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
};
