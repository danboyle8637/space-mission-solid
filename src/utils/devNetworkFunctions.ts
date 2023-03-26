import type {
  Env,
  CreateUserBody,
  ActivateMissionBody,
  CreateMissionStatsBody,
  GetMissionStatsBody,
  UpdateMissionStatsBody,
  UserKVDoc,
} from "../types/api";
import type { MissionId, MissionStatsDoc } from "../types";

export const getTestEndpoint = async (env: Env) => {
  const url = `${env.USER_WORKER_DEV}/test`;

  const body = {
    devFunctions: "Request is coming from inside dev fuctions",
  };

  const testRes = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (testRes.status !== 200) {
    const errorMessage = await testRes.text();
    throw new Error(errorMessage);
  }

  const testData = await testRes.json();

  return testData;
};

// **************** USER WORKER **************** //

// This hits the Worker in local mode to get the data
export const getUser = async (env: Env) => {
  const url = `${env.USER_WORKER_DEV}/get-user`;

  const userRes = await fetch(url, {
    method: "GET",
  });

  if (userRes.status !== 200) {
    const errorMessage = await userRes.text();
    throw new Error(errorMessage);
  }

  const userData = await userRes.json();

  return userData;
};

export const createUser = async (newUser: CreateUserBody, env: Env) => {
  const url = `${env.USER_WORKER_DEV}/create-user`;

  const body: CreateUserBody = {
    firstName: newUser.firstName,
    emailAddress: newUser.emailAddress,
    callSign: newUser.callSign,
  };

  const userRes = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (userRes.status !== 200) {
    const errorMessage = await userRes.text();
    throw new Error(errorMessage);
  }

  const isUserCreated = await userRes.text();

  return isUserCreated;
};

export const updateUser = async (env: Env) => {};

export const activateMission = async (missionId: MissionId, env: Env) => {
  const url = `${env.USER_WORKER_DEV}/activate-mission`;

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

export const userFinishMission = async (env: Env) => {
  const url = `${env.USER_WORKER_DEV}/finish-mission`;

  const finishMissionRes = await fetch(url, {
    method: "GET",
  });

  if (finishMissionRes.status !== 200) {
    const errorMessage = await finishMissionRes.text();
    throw new Error(errorMessage);
  }

  const isUserUpdated = await finishMissionRes.text();

  return isUserUpdated;
};

// **************** MISSIONS WORKER **************** //

export const getMissions = async (env: Env) => {
  const url = `${env.MISSION_STATS_WORKER_DEV}/get-missions`;

  const missionsRes = await fetch(url, {
    method: "GET",
  });

  if (missionsRes.status !== 200) {
    const errorMessage = await missionsRes.text();
    throw new Error(errorMessage);
  }

  const missions = await missionsRes.json();

  return missions;
};

// **************** MISSION STATS WORKER **************** //

export const createMissionStats = async (missionId: MissionId, env: Env) => {
  const url = `${env.MISSIONS_WORKER_DEV}/create-mission-stats`;

  const body: CreateMissionStatsBody = {
    missionId: missionId,
  };

  const statsRes = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (statsRes.status !== 200) {
    const errorMessage = await statsRes.text();
    throw new Error(errorMessage);
  }

  const isMissionStatsCreated = await statsRes.text();

  return isMissionStatsCreated;
};

export const getMissionStats = async (
  missionStatsBody: GetMissionStatsBody,
  env: Env
) => {
  const url = `${env.MISSION_STATS_WORKER_DEV}/get-mission-stats`;

  const body: GetMissionStatsBody = {
    missionId: missionStatsBody.missionId,
    status: missionStatsBody.status,
  };

  const getMissionStatsRes = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (getMissionStatsRes.status !== 200) {
    const errorMessage = await getMissionStatsRes.text();
    throw new Error(errorMessage);
  }

  const missionStats = await getMissionStatsRes.json();

  return missionStats;
};

export const getAllMissionStats = async (env: Env) => {
  const url = `${env.MISSION_STATS_WORKER_DEV}/get-all-mission-stats`;

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

export const getFinishedMissions = async (env: Env) => {
  const url = `${env.MISSION_STATS_WORKER_DEV}/get-finished-missions`;

  const finishedMissionsStatsRes = await fetch(url, {
    method: "GET",
  });

  if (finishedMissionsStatsRes.status !== 200) {
    const errorMessage = await finishedMissionsStatsRes.text();
    throw new Error(errorMessage);
  }

  const finishedMissions: MissionStatsDoc[] =
    await finishedMissionsStatsRes.json();

  return finishedMissions;
};

export const updateMissionStats = async (
  updateMissionBody: UpdateMissionStatsBody,
  env: Env
) => {
  const url = `${env.MISSION_STATS_WORKER_DEV}/update-mission-stats`;

  const body: UpdateMissionStatsBody = {
    missionId: updateMissionBody.missionId,
    goal: updateMissionBody.goal,
  };

  const updateMissionStatsRes = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

  if (updateMissionStatsRes.status !== 200) {
    const errorMessage = await updateMissionStatsRes.text();
    throw new Error(errorMessage);
  }

  const updateMessage = await updateMissionStatsRes.text();

  return updateMessage;
};
