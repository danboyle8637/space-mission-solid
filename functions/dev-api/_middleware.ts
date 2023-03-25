import type { PagesFunction } from "@cloudflare/workers-types";
import { parse } from "cookie";

import {
  getExpiresAtTimestamp,
  getErrorMessage,
} from "../../src/utils/helpers";
import type { Env, UserKVDoc } from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const COOKIE_NAME = "session-token";
  const headers = context.request.headers;
  const cookie = headers.get("Cookie") || "";
  const cookieData = parse(cookie);

  if (cookie === "" || cookieData[COOKIE_NAME] === undefined) {
    const response = new Response(
      "No active session. Login to create new session.",
      { status: 403 }
    );
    return response;
  }

  const request = context.request;
  const updateRequest = new Request(request);

  const sessionKey = cookieData[COOKIE_NAME];
  const workerStamp = Date.now();

  const userDoc = await context.env.SPACE_MISSION_SESSIONS.get(sessionKey);

  if (!userDoc) {
    const response = new Response("No active session. Login.", { status: 401 });
    return response;
  }

  const userData: UserKVDoc = JSON.parse(userDoc);
  const { userId, expiresAt, sessionId } = userData;

  const expiresTimestamp = getExpiresAtTimestamp(expiresAt);

  // Checks the expires time
  if (expiresTimestamp < workerStamp) {
    // Need to logout and sign back in
    // Clear KV session
    await context.env.SPACE_MISSION_SESSIONS.delete(sessionKey);

    const stytchId = context.env.STYTCH_PROJECT_ID;
    const stytchSecret = context.env.STYTCH_SECRET;
    const body = {
      session_id: sessionId,
    };

    try {
      const stytchUrl = "https://test.stytch.com/v1/sessions/revoke";
      const userPassword = `${stytchId}:${stytchSecret}`;
      const encodedUserPassword = btoa(userPassword);

      await fetch(stytchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedUserPassword}`,
        },
        body: JSON.stringify(body),
      });

      const response = new Response(
        "Session expired and revoked. Login again.",
        { status: 403 }
      );
      return response;
    } catch (error) {
      const response = new Response(getErrorMessage(error), { status: 401 });
      return response;
    }
  }

  updateRequest.headers.append("user", userId);
  return context.next(updateRequest);
};
