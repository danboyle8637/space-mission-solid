import type { PagesFunction } from "@cloudflare/workers-types";
import { parse } from "cookie";

import {
  getErrorMessage,
  getExpiresAtTimestamp,
} from "../../src/utils/helpers";
import type { Env, GetUserBody, UserKVDoc } from "../../src/types/api";

// If user is not in state but there should be a cookie
export const onRequest: PagesFunction<Env> = async (context) => {
  const COOKIE_NAME = "session-token";
  const headers = context.request.headers;
  const cookie = headers.get("Cookie") || "";
  const cookieData = parse(cookie);

  if (cookie === "" || cookieData[COOKIE_NAME] === null) {
    const response = new Response("LOGIN", { status: 406 });
    return response;
  }

  const request = context.request;
  const getUserRequest = request.clone();
  const formattedReq = new Response(request.body);
  const body: GetUserBody = await formattedReq.json();
  const { timestamp } = body;

  const token = cookieData[COOKIE_NAME];

  const userDoc = await context.env.SPACE_MISSION_SESSIONS.get(token);
  const userData: UserKVDoc = JSON.parse(userDoc);
  const { expiresAt } = userData;

  const expiresTimestamp = getExpiresAtTimestamp(expiresAt);

  if (expiresTimestamp < timestamp) {
    // Need to logout and sign back in
    const response = new Response("LOGIN", { status: 200 });
    return response;
  }

  try {
    // Get user
    const response = await context.env.USER_WORKER.fetch(getUserRequest);

    return response;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
};
