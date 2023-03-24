import type { PagesFunction } from "@cloudflare/workers-types";

import {
  createMissionStats,
  getMissionStats,
  getAllMissionStats,
} from "../../../src/utils/devNetworkFunctions";
import { getErrorMessage } from "../../../src/utils/helpers";
import type {
  Env,
  MissionStatsActions,
  CreateMissionStatsBody,
  GetMissionStatsBody,
} from "../../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const workerAction: MissionStatsActions = url.pathname
    .split("/")
    .pop() as MissionStatsActions;

  try {
    switch (workerAction) {
      case "get-mission-stats": {
        const formattedReq = new Response(context.request.body);
        const body: GetMissionStatsBody = await formattedReq.json();

        const missionsStats = await getMissionStats(body, context.env);

        const response = new Response(JSON.stringify(missionsStats), {
          status: 200,
        });
        return response;
      }
      case "create-mission-stats": {
        const formattedReq = new Response(context.request.body);
        const body: CreateMissionStatsBody = await formattedReq.json();
        const { missionId } = body;

        const isMissionStatsDocCreated = await createMissionStats(
          missionId,
          context.env
        );

        const response = new Response(isMissionStatsDocCreated, {
          status: 200,
        });
        return response;
      }
      case "get-all-mission-stats": {
        const allMissionStats = await getAllMissionStats(context.env);

        const response = new Response(JSON.stringify(allMissionStats), {
          status: 200,
        });
        return response;
      }
      case "get-finished-missions": {
      }
      case "update-mission-stats": {
      }
      default: {
        const response = new Response("Bad Mission Stats request", {
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
