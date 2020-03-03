import { AxiosResponse } from "axios";

// src/store/chat/types.ts

export enum ActionTypeKeys {
  NOACTION = "NOACTION",
  DONE = "DONE",
  GET_ERRORS = "GET_ERRORS",
  SERVER_ERROR = "SERVER_ERROR",
  REGISTER_DONE = "REGISTER_DONE",
  SET_CURRENT_USER = "SET_CURRENT_USER",
  GET_PROFILE = "GET_PROFILE",
  PROFILE_LOADING = "PROFILE_LOADING",
  PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND",
  CLEAR_CURRENT_PROFILE = "CLEAR_CURRENT_PROFILE",
  GET_PROFILES = "GET_PROFILES"
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
  exp: number;
}

export interface IProfile {
  profile: string;
  loading: boolean;
}

//TODO: properties should not be null
export interface AuthState {
  type: ActionTypeKeys;
  isAuthenticatd?: boolean;
  user?: IUser;
}

export interface profileState {
  profile?: IProfile;
  profiles?: any;
  loading?: boolean;
}

export interface ICustomError {
  response: AxiosResponse;
}

//TODO: any should remove
interface SendMessageAction {
  type: ActionTypeKeys;
  payload?: IUser | ICustomError | AuthState | profileState | any;
}

export type ActionTypes = SendMessageAction;
