import type { PagesFunction } from "@cloudflare/workers-types";

import {
  getTestEndpoint,
  getUser,
  createUser,
  activateMission,
  userFinishMission,
} from "../../../src/utils/devNetworkFunctions";
import { getErrorMessage } from "../../../src/utils/helpers";
import type {
  Env,
  UserActions,
  CreateUserBody,
  ActivateMissionBody,
} from "../../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const workerAction: UserActions = url.pathname
    .split("/")
    .pop() as UserActions;

  try {
    switch (workerAction) {
      case "create-user": {
        const formattedReq = new Response(context.request.body);
        const body: CreateUserBody = await formattedReq.json();

        const userBody: CreateUserBody = {
          firstName: body.firstName,
          emailAddress: body.emailAddress,
          callSign: body.callSign,
        };

        const isUserCreated = await createUser(userBody, context.env);

        const response = new Response(isUserCreated, { status: 200 });
        return response;
      }
      case "get-user": {
        const userData = await getUser(context.env);
        const response = new Response(JSON.stringify(userData), {
          status: 200,
        });
        return response;
      }
      case "update-user": {
      }
      case "activate-mission": {
        const formattedReq = new Response(context.request.body);
        const body: ActivateMissionBody = await formattedReq.json();
        const { missionId } = body;

        const isMissionActivated = await activateMission(
          missionId,
          context.env
        );

        const response = new Response(isMissionActivated, { status: 200 });
        return response;
      }
      case "finish-mission": {
        const isMissionCleared = await userFinishMission(context.env);

        const response = new Response(isMissionCleared, { status: 200 });
        return response;
      }
      case "update-avatar": {
        // Coming Soon
      }
      case "test": {
        const testData = await getTestEndpoint(context.env);

        const response = new Response(JSON.stringify(testData), {
          status: 200,
        });
        return response;
      }
      default: {
        const response = new Response("Bad user action request", {
          status: 400,
        });
        return response;
      }
    }
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
};
