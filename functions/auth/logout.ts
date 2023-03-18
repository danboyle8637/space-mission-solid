import { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  // Kill the session in KV and on Stytch

  return new Response();
};
