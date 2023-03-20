import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../src/types/api";

import { getTestEndpoint, getUser } from "../../src/utils/devNetworkFunctions";
import { getErrorMessage } from "../../src/utils/helpers";

export const onRequest: PagesFunction<Env> = async (context) => {
  const params = context.params.dev;

  if (params.length !== 2) {
    const response = new Response("Bad Request to dev endpoint.", {
      status: 400,
    });
    return response;
  }

  const worker = params[0];
  const endpoint = params[1];

  try {
    switch (worker) {
      case "user": {
        switch (endpoint) {
          case "test": {
            const testData = await getTestEndpoint(context.env);

            const response = new Response(JSON.stringify(testData), {
              status: 200,
            });
            return response;
          }
          case "get-user": {
            const userData = await getUser(context.env);

            const response = new Response(JSON.stringify(userData), {
              status: 200,
            });
            return response;
          }
        }
        break;
      }
      case "missions": {
      }
      case "mission-stats": {
      }
      default: {
        throw new Error("Bad dev request. No endpoints match.");
      }
    }
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
};
