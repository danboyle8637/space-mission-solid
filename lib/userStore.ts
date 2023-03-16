import { createSignal } from "solid-js";

import type { UserDoc } from "../src/types";
import type { UserLoginData } from "../src/types/api";

interface UserState {
  userId: string;
  emailAddress: string;
  activeMission: string;
  finishedMissions: string[];
  callsign: string;
  avatar: string;
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
  userId: "",
  emailAddress: "",
  activeMission: "",
  finishedMissions: [],
  callsign: "",
  avatar: "",
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
