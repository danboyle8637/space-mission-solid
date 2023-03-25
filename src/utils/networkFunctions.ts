import {
  toggleIsMakingNetworkRequest,
  resetLoginForm,
  updateShowPhoneForm,
  updateShowNewMemberPasscodeForm,
  updateShowReturningMemberPasscodeForm,
  toggleIsAuthenticated,
} from "../../lib/loginStore";
import { updateUserLoginData } from "../../lib/userStore";
import type { MissionId, UserDoc } from "../types";
import type {
  UserLoginData,
  LoginPhoneReqBody,
  AuthenticateNewMemberBody,
  AuthenticateCurrentMemberBody,
  GetUserResponse,
  CreateUserBody,
  ActivateMissionBody,
  CreateMissionStatsBody,
  GetMissionStatsBody,
  UpdateMissionStatsBody,
} from "../types/api";

import { user as userState } from "../../lib/userStore";

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

  toggleIsMakingNetworkRequest();
  updateShowNewMemberPasscodeForm(false);

  return testMessage;
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
  toggleIsAuthenticated();

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

// ??????????? USER WORKER ??????????? //

export const createUser = async (createUserBody: CreateUserBody) => {
  const url = import.meta.env.DEV
    ? "/dev-api/user/create-user"
    : "/api/user/create-user";

  const body: CreateUserBody = {
    firstName: createUserBody.firstName,
    emailAddress: createUserBody.emailAddress,
    callSign: createUserBody.callSign,
  };

  const createUserRes = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (createUserRes.status !== 200) {
    const errorMessage = await createUserRes.text();
    throw new Error(errorMessage);
  }

  const isUserCreated = await createUserRes.text();

  return isUserCreated;
};

export const getUser = async () => {
  const url = import.meta.env.DEV
    ? "/dev-api/user/get-user"
    : "/api/user/get-user";

  // const testUser: GetUserResponse = {
  //   firstName: "",
  //   activeMission: null,
  //   finishedMissions: [],
  //   callsign: "",
  //   avatarUrl: null,
  // };

  // return testUser;

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

export const activateMission = async (missionId: MissionId) => {
  const url = import.meta.env.DEV
    ? "/dev-api/user/activate-mission"
    : "/api/user/activate-mission";

  const body: ActivateMissionBody = {
    missionId: missionId,
  };

  const missionRes = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (missionRes.status !== 200) {
    const errorMessage = await missionRes.text();
    throw new Error(errorMessage);
  }

  const isMissionActivated = await missionRes.text();

  return isMissionActivated;
};

const updateAvatar = async () => {};

// ! SHould not need this function or end point at all
const finishCancelMissionForUser = async () => {
  const url = import.meta.env.DEV
    ? "/dev-api/user/finish-mission"
    : "/api/user/finish-mission";

  const userRes = await fetch(url, {
    method: "PATCH",
  });

  if (userRes.status !== 200) {
    const errorMessage = await userRes.text();
    throw new Error(errorMessage);
  }

  const isUserUpdated = await userRes.text();

  return isUserUpdated;
};

// ??????????? MISSION WORKER ??????????? //

export const getMissions = async () => {
  const url = import.meta.env.DEV
    ? "/dev-api/missions/get-missions"
    : "/api/missions/get-missions";

  const missionsRes = await fetch(url, {
    method: "GET",
  });

  if (missionsRes.status === 200) {
    const errorMessage = await missionsRes.text();
    throw new Error(errorMessage);
  }

  return missionsRes.json();
};

// ??????????? MISSION STATS WORKER ??????????? //

export const createMissionStats = async (missionId: MissionId) => {
  const url = import.meta.env.DEV
    ? "/dev-api/mission-stats/create-mission-stats"
    : "/api/mission-stats/create-mission-stats";

  const body: CreateMissionStatsBody = {
    missionId: missionId,
  };

  const missionStatsRes = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (missionStatsRes.status !== 200) {
    const errorMessage = await missionStatsRes.text();
    throw new Error(errorMessage);
  }

  const isMissionStatsCreated = await missionStatsRes.text();

  return isMissionStatsCreated;
};

export const getMissionStats = async (
  getMissionStatsBody: GetMissionStatsBody
) => {
  const url = import.meta.env.DEV
    ? "/dev-api/mission-stats/get-mission-stats"
    : "/api/mission-stats/get-mission-stats";

  const body: GetMissionStatsBody = {
    missionId: getMissionStatsBody.missionId,
    status: getMissionStatsBody.status,
  };

  const missionStatsRes = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (missionStatsRes.status !== 200) {
    const errorMessage = await missionStatsRes.text();
    throw new Error(errorMessage);
  }

  const missionStats = await missionStatsRes.json();

  return missionStats;
};

export const getAllMissionStats = async () => {
  const url = import.meta.env.DEV
    ? "/dev-api/mission-stats/get-all-mission-stats"
    : "/api/mission-stats/get-all-mission-stats";

  const allMissionStatsRes = await fetch(url, {
    method: "GET",
  });

  if (allMissionStatsRes.status !== 200) {
    const errorMessage = await allMissionStatsRes.text();
    throw new Error(errorMessage);
  }

  const allMissionStats = await allMissionStatsRes.json();

  return allMissionStats;
};

export const updateMissionStats = async (
  updateMissionStatsBody: UpdateMissionStatsBody
) => {
  const url = import.meta.env.DEV
    ? "/dev-api/mission-stats/update-mission-stats"
    : "/api/mission-stats/update-mission-stats";

  const body: UpdateMissionStatsBody = {
    missionId: updateMissionStatsBody.missionId,
    goal: updateMissionStatsBody.goal,
  };

  const updatedMissionStatsRes = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

  if (updatedMissionStatsRes.status !== 200) {
    const errorMessage = await updatedMissionStatsRes.text();
    throw new Error(errorMessage);
  }

  const isMissionStatsUpdated = await updatedMissionStatsRes.text();

  return isMissionStatsUpdated;
};

export const getFinishedMissionStats = async () => {
  const url = import.meta.env.DEV
    ? "/dev-api/mission-stats/get-finished-missions"
    : "/api/mission-stats/get-finished-missions";

  const finishedMissionStatsRes = await fetch(url, {
    method: "GET",
  });

  if (finishedMissionStatsRes.status !== 200) {
    const errorMessage = await finishedMissionStatsRes.text();
    throw new Error(errorMessage);
  }

  const finishedMissionStats = await finishedMissionStatsRes.json();

  return finishedMissionStats;
};

export const cancelMissionStats = async (missionId: MissionId) => {
  const url = import.meta.env.DEV
    ? "/dev-api/mission-stats/create-mission-stats"
    : "/api/mission-stats/create-mission-stats";

  const body: CreateMissionStatsBody = {
    missionId: missionId,
  };

  const missionStatsRes = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (missionStatsRes.status !== 200) {
    const errorMessage = await missionStatsRes.text();
    throw new Error(errorMessage);
  }

  const isMissionStatsCreated = await missionStatsRes.text();

  return isMissionStatsCreated;
};
