import { createSignal } from "solid-js";

import type { UserDoc, MissionId } from "../src/types";
import type { UserLoginData } from "../src/types/api";

interface UserState {
  firstName: string;
  activeMission: MissionId | null;
  finishedMissions: MissionId[];
  callsign: string;
  avatarUrl: string | null;
}

// Update one item at a time... you don't need to replace the remaining state
// export const [user, setUser] = createStore<UserState>({
//   userId: "",
//   emailAddress: "",
//   activeMission: "",
//   finishedMissions: [],
//   callsign: "",
//   avatar: "",
// });

export const [user, setUser] = createSignal<UserState>({
  firstName: "",
  activeMission: null,
  finishedMissions: [],
  callsign: "",
  avatarUrl: null,
});

export const updateUser = (user: UserDoc) => {
  setUser(user);
};

export const [userLoginData, setUserLoginData] = createSignal<UserLoginData>({
  phoneId: "",
  userCreated: true,
});

export const updateUserLoginData = (phoneId: string, userCreated: boolean) => {
  setUserLoginData(() => ({
    phoneId: phoneId,
    userCreated: userCreated,
  }));
};
