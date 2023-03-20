import type { Env } from "../types/api";

export const getTestEndpoint = async (env: Env) => {
  const url = `${env.USER_WORKER_DEV}/test`;

  const body = {
    devFunctions: "Request is coming from inside dev fuctions",
  };

  const testRes = await fetch(url, {
    method: "POST",
    headers: {
      user: `${env.DAN_USERID_DEV}`,
    },
    body: JSON.stringify(body),
  });

  if (testRes.status !== 200) {
    const errorMessage = await testRes.text();
    throw new Error(errorMessage);
  }

  const testData = await testRes.json();

  return testData;
};

// This hits the Worker in local mode to get the data
export const getUser = async (env: Env) => {
  const url = `${env.USER_WORKER_DEV}/get-user`;

  const userRes = await fetch(url, {
    method: "GET",
    headers: {
      user: `${env.DAN_USERID_DEV}`,
    },
  });

  if (userRes.status !== 200) {
    const errorMessage = await userRes.text();
    throw new Error(errorMessage);
  }

  const userData = await userRes.json();

  return userData;
};
