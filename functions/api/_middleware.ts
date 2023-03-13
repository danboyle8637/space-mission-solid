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

  const userDoc = await context.env.SPACE_MISSION_SESSIONS.get(token);
  const userData: UserKVDoc = JSON.parse(userDoc);
  const { userId, expiresAt } = userData;

  const expiresTimestamp = getExpiresAtTimestamp(expiresAt);

  if (expiresTimestamp < timestamp) {
    // Need to logout and sign back in
    const response = new Response("LOGIN", { status: 403 });
    return response;
  }

  request.headers.set("user", userId);
  return context.next();
};
