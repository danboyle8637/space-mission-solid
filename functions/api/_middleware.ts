import { PagesFunction } from "@cloudflare/workers-types";
import { parse } from "cookie";

import { getErrorMessage } from "../../src/utils/helpers";
import type { Env } from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const requestToPass = context.request.clone();

  const COOKIE_NAME = "session-token";
  const headers = context.request.headers;
  const cookie = headers.get("Cookie") || "";
  const cookieData = parse(cookie);

  if (cookieData[COOKIE_NAME] !== null) {
    const token = cookieData[COOKIE_NAME];
    console.log("Token: ", token);

    // const sessionsData = context.env.SPACE_MISSION_SESSIONS.get(token)

    // Look up session in KV
    // Check the expires time
    // If good... pass request
    // If bad... Logout user or get a refresh token for new session
  }

  // await context.env.SPACE_MISSION_SESSIONS.put(
  //   "123456",
  //   JSON.stringify({
  //     userId: "12121212",
  //     call_sign: "Ricky Backer",
  //   })
  // );

  try {
    return context.next();
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
};
