import { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const clonedReq = context.request.clone();
  const headers = context.request.headers;

  const routerHeader = headers.get("api-service");

  if (routerHeader) {
    console.log(routerHeader);
    return context.env.USER_WORKER.fetch(clonedReq);
  } else {
    return new Response("No router header", { status: 400 });
  }
};
