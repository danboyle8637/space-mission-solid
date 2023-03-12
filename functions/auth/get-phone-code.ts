import { PagesFunction } from "@cloudflare/workers-types";

import { getErrorMessage } from "../../src/utils/helpers";
import type {
  Env,
  LoginPhoneReqBody,
  StytchLoginCreateRes,
} from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const request = context.request;

  const formattedReq = new Response(request.body);
  const body: LoginPhoneReqBody = await formattedReq.json();
  const { phoneNumber } = body;

  if (!phoneNumber) {
    const response = new Response("Bad Request", { status: 400 });
    return response;
  }

  try {
    if (phoneNumber === "18438191412" || phoneNumber === "18434376700") {
      const stytchLoginCreateUrl =
        "https://test.stytch.com/v1/magic_links/email/login_or_create";

      const stytchId = context.env.STYTCH_PROJECT_ID;
      const stytchSecret = context.env.STYTCH_SECRET;

      const loginBody = {
        phone_number: phoneNumber,
      };

      const loginRes = await fetch(stytchLoginCreateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${stytchId}:${stytchSecret}`,
        },
        body: JSON.stringify(loginBody),
      });

      if (loginRes.status !== 200) {
        const response = new Response("Failed to login", { status: 500 });
        return response;
      }

      // TODO - send back the phone_id so you can send that to authenticate
      // TODO - Need to know if they are already a member... they need to see a different phone verification

      const response = new Response("Code sent", { status: 200 });
      return response;
    }

    return new Response("You're Not Allowed In Just Yet");
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
};
