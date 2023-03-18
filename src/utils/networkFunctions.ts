import {
  toggleIsMakingNetworkRequest,
  resetLoginForm,
  updateShowPhoneForm,
  updateShowNewMemberPasscodeForm,
  updateShowReturningMemberPasscodeForm,
} from "../../lib/loginStore";
import { updateUserLoginData } from "../../lib/userStore";
import type {
  UserLoginData,
  LoginPhoneReqBody,
  AuthenticateNewMemberBody,
  AuthenticateCurrentMemberBody,
} from "../types/api";

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

  if (!phoneId || !userCreated) {
    throw new Error(`No phoneId: ${phoneId} or userCreated: ${userCreated}`);
  }

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

  const userData = {
    firstName: body.firstName,
    callSign: body.callSign,
  };

  const testMessage = await newMemberRes.json();

  console.log(testMessage);

  toggleIsMakingNetworkRequest();
  updateShowNewMemberPasscodeForm(false);

  return testMessage;
};

export const fetchAuthenticateCurrentMember = async (
  body: AuthenticateCurrentMemberBody
) => {
  const url = "/auth/authenticate-user";
  const currentMemberReq = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (currentMemberReq.status !== 200) {
    throw new Error("Could not create new User");
  }

  const testMessage = await currentMemberReq.json();

  console.log(testMessage);

  toggleIsMakingNetworkRequest();
  updateShowReturningMemberPasscodeForm(false);

  return testMessage;
};
