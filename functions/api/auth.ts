import { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const clonedReq = context.request.clone();
  const headers = context.request.headers;

  const routerHeader = headers.get("api-service");

  await context.env.SPACE_MISSION_SESSIONS.put(
    "123456",
    JSON.stringify({
      userId: "654321",
      call_sign: "Maverick",
    })
  );

  if (routerHeader) {
    console.log(routerHeader);
    // return context.env.USER_WORKER.fetch(clonedReq);
    return new Response("KV Should be filled", { status: 200 });
  } else {
    return new Response("No router header", { status: 400 });
  }
};
