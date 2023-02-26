import { PagesFunction } from "@cloudflare/workers-types";

export const onRequest = async (context) => {
  console.log(context);
  return new Response(
    "Auth route maybe with middleware and then send request to correct worker."
  );
};
