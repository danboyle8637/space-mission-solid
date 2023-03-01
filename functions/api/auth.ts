import { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  const clonedReq = context.request.clone();
  const headers = context.request.headers;

  const routerHeader = headers.get("api-service");

  // await context.env.SPACE_MISSION_SESSIONS.put(
  //   "123456",
  //   JSON.stringify({
  //     userId: "12121212",
  //     call_sign: "Ricky Backer",
  //   })
  // );

  if (routerHeader) {
    try {
      return context.env.USER_WORKER.fetch(clonedReq);
    } catch {
      return new Response("Failed to route request to User Worker", {
        status: 500,
      });
    }
  } else {
    return new Response("No router header", { status: 400 });
  }
};
