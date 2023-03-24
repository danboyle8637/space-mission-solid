import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../src/types/api";

export const onRequest: PagesFunction<Env> = async (context) => {
  // Hit login and look in KV for a user... phone number
  // If user... user exists make request to get user from User Worker
  // Set the cookie and store the user data in the KV doc

  // If no user... hit User Worker to create user
  // Create user in KV using the phone number... might have to do this first
  // Set the cookie and store user data in KV

  const response = new Response("User Logged In", { status: 200 });
  const uuid = crypto.randomUUID();
  const secondsToExpire = 1000 * 60 * 24;
  const cookieHeader = `dev-session-token=${uuid}; SameSite=Lax; Path=/dev-api; Secure; HttpOnly; Max-Age=${secondsToExpire}`;
  response.headers.set("Set-Cookie", cookieHeader);
  return response;
};
