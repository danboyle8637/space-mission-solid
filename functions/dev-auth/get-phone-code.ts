import type { PagesFunction } from "@cloudflare/workers-types";

import { getErrorMessage } from "../../src/utils/helpers";
import type {
  Env,
  LoginPhoneReqBody,
  UserLoginData,
} from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const request = context.request;

  const formattedReq = new Response(request.body);
  const body: LoginPhoneReqBody = await formattedReq.json();
  const { phoneNumber } = body;

  if (!phoneNumber) {
    const response = new Response("Bad Request - no phone number", {
      status: 400,
    });
    return response;
  }

  try {
    const phoneCode = "123456";
    let userCreated = false;

    // Look up the user in KV
    const userDoc = await context.env.SPACE_MISSION_USER_DEV_DATABASE.get(
      phoneNumber
    );

    console.log(userDoc);

    const response = new Response("Hey from my mocked authentication", {
      status: 200,
    });
    return response;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
};
