import type { PagesFunction } from "@cloudflare/workers-types";
import { parse } from "cookie";

import {
  getExpiresAtTimestamp,
  getErrorMessage,
} from "../../src/utils/helpers";
import type {
  Env,
  DeleteUserSessionBody,
  UserSessionRes,
} from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const COOKIE_NAME = "dev-session-token";
  const headers = context.request.headers;
  const cookie = headers.get("Cookie") || "";
  const cookieData = parse(cookie);

  if (cookie === "" || cookieData[COOKIE_NAME] === null) {
    const response = new Response(
      "No active session. Login to create new session.",
      { status: 403 }
    );
    return response;
  }

  const request = context.request;
  const updateRequest = new Request(request);

  const uuid = cookieData[COOKIE_NAME];
  const workerStamp = Date.now();

  try {
    const sessionUrl = `${context.env.USER_WORKER_DEV}/get-dev-session`;

    const sessionRes = await fetch(sessionUrl, {
      method: "GET",
      headers: {
        sessionToken: uuid,
      },
    });

    if (sessionRes.status !== 200) {
      const errorMessage = await sessionRes.text();
      throw new Error(errorMessage);
    }

    const userData: UserSessionRes = await sessionRes.json();
    const { userId, sessionId, expiresAt } = userData;

    if (!userId || !sessionId || !expiresAt) {
      const response = new Response("No active session. Login.", {
        status: 401,
      });
      return response;
    }

    const expiresTimestamp = getExpiresAtTimestamp(expiresAt);

    // Checks the expires time
    if (expiresTimestamp < workerStamp) {
      // Need to logout and sign back in
      // Clear KV session
      const deleteSessionUrl = `${context.env.USER_WORKER_DEV}/delete-dev-session`;

      const sessionBody: DeleteUserSessionBody = {
        uuid: uuid,
      };

      const deleteSessionRes = await fetch(deleteSessionUrl, {
        method: "DELETE",
        body: JSON.stringify(sessionBody),
      });

      if (deleteSessionRes.status !== 200) {
        const errorMessage = await deleteSessionRes.text();
        throw new Error(errorMessage);
      }

      const stytchId = context.env.STYTCH_PROJECT_ID;
      const stytchSecret = context.env.STYTCH_SECRET;
      const stytchSessionBody = {
        session_id: sessionId,
      };

      const stytchUrl = "https://test.stytch.com/v1/sessions/revoke";
      const userPassword = `${stytchId}:${stytchSecret}`;
      const encodedUserPassword = btoa(userPassword);

      await fetch(stytchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedUserPassword}`,
        },
        body: JSON.stringify(stytchSessionBody),
      });

      const response = new Response(
        "Session expired and revoked. Login again.",
        {
          status: 403,
        }
      );
      return response;
    }

    updateRequest.headers.append("user", userId);
    return context.next(updateRequest);
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
};
