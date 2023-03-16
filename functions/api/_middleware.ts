import { PagesFunction } from "@cloudflare/workers-types";
import { parse } from "cookie";

import { getExpiresAtTimestamp } from "../../src/utils/helpers";
import type { Env, GetUserBody, UserKVDoc } from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const COOKIE_NAME = "session-token";
  const headers = context.request.headers;
  const cookie = headers.get("Cookie") || "";
  const cookieData = parse(cookie);

  if (cookie === "" || cookieData[COOKIE_NAME] === null) {
    const response = new Response("LOGIN", { status: 403 });
    return response;
  }

  const request = context.request;
  const formattedReq = new Response(request.body);
  const body: GetUserBody = await formattedReq.json();
  const { timestamp } = body;

  const token = cookieData[COOKIE_NAME];
  const workerStamp = Date.now();
  console.log(workerStamp);

  const userDoc = await context.env.SPACE_MISSION_SESSIONS.get(token);
  const userData: UserKVDoc = JSON.parse(userDoc);
  const { userId, expiresAt } = userData;

  const expiresTimestamp = getExpiresAtTimestamp(expiresAt);

  if (expiresTimestamp < timestamp) {
    // Need to logout and sign back in
    // Clear KV session
    await context.env.SPACE_MISSION_SESSIONS.delete(token);

    const stytchId = context.env.STYTCH_PROJECT_ID;
    const stytchSecret = context.env.STYTCH_SECRET;
    const sessionId = "";
    const body = {
      session_id: sessionId,
    };

    // Revoke token in Stytch
    const stytchUrl = "https://test.stytch.com/v1/sessions/revoke";
    await fetch(stytchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${stytchId}:${stytchSecret}`,
      },
      body: JSON.stringify(body),
    });

    const response = new Response("LOGIN", { status: 403 });
    return response;
  }

  request.headers.set("user", userId);
  return context.next();
};
