import { KVNamespace, Fetcher } from "@cloudflare/workers-types";
import { MissionId, MissionDoc } from "./index";

export interface ActivateMissionUserDocBody {
  missionId: MissionId;
}

export interface ActivateMissionStatsDocBody {
  missionId: MissionId;
  goals: {
    isGoal1Complete: boolean;
    isGoal2Complete: boolean;
    isGoal3Complete: boolean;
  };
}

export interface Env {
  DAN_EMAIL: string;
  SPACE_MISSION_SESSIONS: KVNamespace;
  SPACE_MISSIONS: KVNamespace; // Don't need this one.
  MISSION_STATS_WORKER: Fetcher;
  MISSION_WORKER: Fetcher;
  USER_WORKER: Fetcher;
  STYTCH_PROJECT_ID: string;
  STYTCH_SECRET: string;
  DAN_PHONE: string;
  KINDAL_PHONE: string;
  USER_WORKER_DEV: string;
  MISSIONS_WORKER_DEV: string;
  MISSION_STATS_WORKER_DEV: string;
}

// ********** API ********** //

export interface LoginEmailReqBody {
  emailAddress: string;
}

export interface LoginPhoneReqBody {
  phoneNumber: string;
}

export interface AuthenticateNewMemberBody {
  phoneId: string;
  code: string;
  firstName: string;
  emailAddress: string;
  callSign: string;
}

export interface AuthenticateCurrentMemberBody {
  phoneId: string;
  code: string;
}

export interface StytchAuthenticateBody {
  method_id: string;
  code: string;
  session_duration_minutes: number;
}

export interface StytchLoginCreateRes {
  status_code: number;
  request_id: string;
  user_id: string;
  phone_id: string;
  user_created: boolean;
}

export interface UserLoginData {
  phoneId: string;
  userCreated: boolean;
}

interface StytchPhoneNumbers {
  phone_id: string; // * Grab this
  phone_number: string;
  verified: boolean;
}

export interface StytchAuthenticateRes {
  method_id: string;
  request_id: string;
  reset_sessions: boolean;
  session: {
    attributes: {
      ip_address: string;
      user_agent: string;
    };
    authentication_factors: {
      delivery_method: string;
      last_athenticated_at: string;
      phone_number_factor: {
        phone_id: string;
        phone_number: string;
      };
      type: string;
    };
    custom_claims: string | null;
    expires_at: string; // * Grab this
    last_accessed_at: string;
    session_id: string;
    started_at: string;
    user_id: string;
  };
  session_jwt: string;
  session_token: string; // * Grab this
  status_code: number;
  user: {
    biometric_registrations: [];
    created_at: string;
    crypto_wallets: [];
    emails: string[];
    name: {
      first_name: string;
      last_name: string;
      middle_name: string;
    };
    password: string | null;
    phone_numbers: StytchPhoneNumbers[];
    providers: [];
    status: [];
    totps: [];
    trusted_metadata: {};
    user_id: string;
    webauthn_registrations: [];
  };
  user_id: string; // * Grab this
}

export interface GetUserBody {
  timestamp: number;
}

export interface UserKVDoc {
  userId: string;
  phoneId: string;
  sessionToken: string;
  sessionId: string;
  expiresAt: string;
}

export interface GetUserResponse {
  first_name: string;
  call_sign: string;
  active_mission_id: MissionId | null;
  avatar_url: string | null;
}
