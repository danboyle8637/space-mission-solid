import {
  toggleIsMakingNetworkRequest,
  resetLoginForm,
  updateShowPhoneForm,
  updateShowNewMemberPasscodeForm,
  updateShowReturningMemberPasscodeForm,
} from "../../lib/loginStore";
import { updateUserLoginData } from "../../lib/userStore";
import type { UserDoc } from "../types";
import type {
  UserLoginData,
  LoginPhoneReqBody,
  AuthenticateNewMemberBody,
  AuthenticateCurrentMemberBody,
  GetUserResponse,
} from "../types/api";

// ************** BACKEND ************** //

export const fetchSendPhoneCode = async (body: LoginPhoneReqBody) => {
  const getCodeRes = await fetch("/auth/get-phone-code", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (getCodeRes.status !== 200) {
    const errorMessage = await getCodeRes.text();
    throw new Error(errorMessage);
  }

  const codeData: UserLoginData = await getCodeRes.json();
  const { phoneId, userCreated } = codeData;

  console.log(codeData);

  toggleIsMakingNetworkRequest();
  updateUserLoginData(phoneId, userCreated);
  resetLoginForm();
  updateShowPhoneForm(false);

  return;
};

export const fetchAuthenticateNewMember = async (
  body: AuthenticateNewMemberBody
) => {
  const url = "/auth/authenticate-new-user";
  const newMemberRes = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (newMemberRes.status !== 200) {
    const errorMessage = await newMemberRes.text();
    throw new Error(errorMessage);
  }

  const testMessage = await newMemberRes.text();

  console.log(testMessage);

  toggleIsMakingNetworkRequest();
  updateShowNewMemberPasscodeForm(false);

  return;
};

export const fetchAuthenticateCurrentMember = async (
  body: AuthenticateCurrentMemberBody
) => {
  const url = "/auth/authenticate-user";
  const currentMemberRes = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (currentMemberRes.status !== 200) {
    const errorMessage = await currentMemberRes.text();
    throw new Error(errorMessage);
  }

  const testMessage = await currentMemberRes.text();

  console.log(testMessage);

  toggleIsMakingNetworkRequest();
  updateShowReturningMemberPasscodeForm(false);

  return;
};

// ************** FRONTEND ************** //

export const getTestEndpoint = async () => {
  const url = import.meta.env.DEV ? "/dev-api/user/test" : "/api/user/test";

  const body = {
    message: "Test response and user Worker are functioning properly.",
  };

  const testRes = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (testRes.status !== 200) {
    const errorMessage = await testRes.text();
    throw new Error(errorMessage);
  }

  const resData = await testRes.json();

  console.log(resData);

  return;
};

export const getUser = async () => {
  const url = import.meta.env.DEV
    ? "/dev-api/user/get-user"
    : "/api/user/get-user";

  const userRes = await fetch(url, {
    method: "GET",
  });

  if (userRes.status !== 200) {
    const errorMessage = await userRes.text();
    throw new Error(errorMessage);
  }

  const user: GetUserResponse = await userRes.json();

  return user;
};

export const getMissions = async () => {
  const url = "/api/mission/get-missions";

  const missionsRes = await fetch(url, {
    method: "GET",
  });

  if (missionsRes.status === 200) {
    const errorMessage = await missionsRes.text();
    throw new Error(errorMessage);
  }

  return missionsRes.json();
};
