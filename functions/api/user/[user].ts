import { PagesFunction } from "@cloudflare/workers-types";

export const onRequest: PagesFunction = (context) => {
  const actionParams = context.params.user;

  console.log("Params: ", actionParams);

  return new Response(`Response from user fuction: ${actionParams}`);
};
