import type { PagesFunction } from "@cloudflare/workers-types";
import { parse } from "cookie";

import {
  getExpiresAtTimestamp,
  getErrorMessage,
} from "../../src/utils/helpers";
import type { Env, UserKVDoc } from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const COOKIE_NAME = "dev-session-token";
  const headers = context.request.headers;
  const cookie = headers.get("Cookie") || "";
  const cookieData = parse(cookie);

  if (cookie === "" || cookieData[COOKIE_NAME] === null) {
    const response = new Response("No active session. Login back into app.", {
      status: 403,
    });
    return response;
  }

  const request = context.request;
  const updateRequest = new Request(request);

  const sessionKey = cookieData[COOKIE_NAME];
  const workerStamp = Date.now();

  const userDoc = await context.env.SPACE_MISSION_SESSIONS.get(sessionKey);
  const userData: UserKVDoc = JSON.parse(userDoc);
  const { userId, expiresAt, sessionId } = userData;

  if (!userId || !expiresAt || !sessionId) {
    if (userDoc) {
      await context.env.SPACE_MISSION_SESSIONS.delete(sessionKey);
    }

    throw new Error("User Id is missing. Login again");
  }

  const expiresTimestamp = getExpiresAtTimestamp(expiresAt);

  if (expiresTimestamp < workerStamp) {
    await context.env.SPACE_MISSION_SESSIONS.delete(sessionKey);

    const response = new Response("Session expired and revoked. Login again.", {
      status: 403,
    });
    return response;
  }

  updateRequest.headers.append("user", userId);
  return context.next(updateRequest);
};
