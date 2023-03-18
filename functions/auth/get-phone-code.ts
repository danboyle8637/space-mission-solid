import { PagesFunction } from "@cloudflare/workers-types";

import { getErrorMessage } from "../../src/utils/helpers";
import type {
  Env,
  LoginPhoneReqBody,
  StytchLoginCreateRes,
  UserLoginData,
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
    // Block any other phone from signing up to Space Mission
    if (
      phoneNumber === context.env.DAN_PHONE ||
      phoneNumber === context.env.KINDAL_PHONE
    ) {
      const stytchLoginCreateUrl =
        "https://test.stytch.com/v1/otps/sms/login_or_create";

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
        const errorMessage = await loginRes.text();
        const response = new Response(`Failed to Login: ${errorMessage}`, {
          status: 500,
        });
        return response;
      }

      const loginData: StytchLoginCreateRes = await loginRes.json();

      const phoneId = loginData.phone_id;
      // true if new - false if already exist
      const userCreated = loginData.user_created;

      if (!phoneId || userCreated) {
        throw new Error(
          "Something went wrong with Stytch request and phone id and userCreated are not here."
        );
      }

      const resBody: UserLoginData = {
        phoneId: phoneId,
        userCreated: userCreated,
      };

      const response = new Response(JSON.stringify(resBody), { status: 200 });
      return response;
    }

    return new Response("You Haven't Attended Astronaught Training", {
      status: 403,
    });
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
};
