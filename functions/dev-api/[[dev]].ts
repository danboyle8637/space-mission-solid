import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../src/types/api";

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

  switch (worker) {
    case "user": {
      const baseUrl = context.env.USER_WORKER_DEV;
      const url = `${baseUrl}/test`;

      const body = {
        devTest: "The dev test worked correctly.",
      };

      const testRes = await fetch(url, {
        method: "GET",
        headers: {
          user: "123456",
        },
        body: JSON.stringify(body),
      });

      if (testRes.status !== 200) {
        const response = new Response("Dev request to user test failed", {
          status: 500,
        });
        return response;
      }

      const testData = await testRes.json();

      const response = new Response(JSON.stringify(testData), { status: 200 });
      return response;
    }
    case "missions": {
    }
    case "mission-stats": {
    }
    default: {
      const response = new Response("Bad Dev Request", { status: 500 });
      return response;
    }
  }
};
