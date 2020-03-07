import { AxiosResponse } from "axios";

// src/store/chat/types.ts

export enum ActionTypeKeys {
  NOACTION = "NOACTION",
  DONE = "DONE",
  GET_ERRORS = "GET_ERRORS",
  SERVER_ERROR = "SERVER_ERROR",
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

export interface IExperience {
  _id: string;
  title: String;
  company: String;
  location: String;
  description: string;
  from: Date;
  to: Date;
}

export interface IEducation {
  _id: string;
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: string;
  description: string;
}

export interface ISocial {
  youtube: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}

export interface IProfile {
  // user: any;
  handle: string;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string[];
  bio: string;
  githubusername: string;
  experience: IExperience[];
  education: IEducation[];
  social: ISocial;
  // date: Date;
}

//TODO: properties should not be null
export interface AuthState {
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
