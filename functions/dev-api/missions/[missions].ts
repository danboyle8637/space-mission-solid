import type { PagesFunction } from "@cloudflare/workers-types";

import { getMissions } from "../../../src/utils/devNetworkFunctions";
import { getErrorMessage } from "../../../src/utils/helpers";
import type { Env, MissionsActions } from "../../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const workerAction: MissionsActions = url.pathname
    .split("/")
    .pop() as MissionsActions;

  try {
    switch (workerAction) {
      case "get-missions": {
        const missions = await getMissions(context.env);

        const response = new Response(JSON.stringify(missions), {
          status: 200,
        });
        return response;
      }
      default: {
        const response = new Response("Bad Missions request", { status: 400 });
        return response;
      }
    }
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
};
