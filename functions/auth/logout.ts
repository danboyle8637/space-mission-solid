import { PagesFunction, Response } from "@cloudflare/workers-types";
import type { Env } from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  return new Response();
};
