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
  GET_PROFILES = "GET_PROFILES",
  POST_LOADING = "POST_LOADING",
  GET_POSTS = "GET_POSTS",
  GET_POST = "GET_POST",
  ADD_POST = "ADD_POST",
  DELETE_POST = "DELETE_POST",
  CLEAR_ERRORS = "CLEAR_ERRORS"
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: string;
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
  _id: string;
  user: IUser;
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
}

export interface ICommentCreate {
  text: string;
  name: string;
  avatar: string;
}

export interface IComment extends ICommentCreate {
  _id: string;
  user: string;
  date?: Date;
}

export interface ILike {
  user: string;
}

export interface IPostCreate {
  text: string;
  name: string;
  avatar: string;
}
export interface IPost extends IPostCreate {
  _id: string;
  user: IUser;
  likes: ILike[];
  comments: IComment[];
  date: string;
}

export interface AuthState {
  isAuthenticatd: boolean;
  user: IUser;
}

export interface profileState {
  profile: IProfile;
  profiles: IProfile[];
  loading: boolean;
}

export interface postState {
  posts: IPost[];
  post: IPost;
  loading: boolean;
}

export interface ICustomError {
  response: AxiosResponse;
}

interface SendMessageAction {
  type: ActionTypeKeys;
  payload?:
    | IUser
    | ICustomError
    | AuthState
    | profileState
    | postState
    | IPost
    | any;
}

export type ActionTypes = SendMessageAction;
