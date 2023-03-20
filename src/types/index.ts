export interface InputValue {
  value: string;
  valid: boolean;
}

export interface InputOptions {
  initial: boolean;
  touched: boolean;
}

export interface PhoneInputValue {
  value: string;
  valid: boolean;
}

export type UpdateValueFunction = (event: InputEvent) => void;

export type UpdateOptionsFunction = (event: FocusEvent) => void;

export type UpdateValueFunctionWithKeyboard = (
  event: KeyboardEvent,
  value: number,
  name: string
) => void;

// ********** API Types ********** //

export type MissionId = "mars" | "titan" | "pleiades" | "prodigious" | "x24c89";

export interface MissionDoc {
  missionId: MissionId;
  coverImage: string;
  altTag: string;
  titleTag: string;
  headline: string;
  description: string;
  difficulty: number;
}

export interface UserDoc {
  firstName: string;
  activeMission: MissionId | null;
  finishedMissions: MissionId[];
  callsign: string;
  avatar: string | null;
}

export interface Goals {
  isGoal1Complete: boolean;
  isGoal2Complete: boolean;
  isGoal3Complete: boolean;
}

export interface MissionStatsDoc {
  missionId: MissionId;
  goals: Goals;
}
