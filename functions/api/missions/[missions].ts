import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  return context.env.MISSION_WORKER.fetch(context.request);
};
