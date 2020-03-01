import { AxiosResponse } from "axios";

// src/store/chat/types.ts

export enum ActionTypeKeys {
  NOACTION = "NOACTION",
  DONE = "DONE",
  REGISTER_DONE = "REGISTER_DONE",
  SET_CURRENT_USER = "SET_CURRENT_USER",
  GET_ERRORS = "GET_ERRORS",
  SERVER_ERROR = "SERVER_ERROR"
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
  exp: number;
}

//TODO: properties should not be null
export interface AuthState {
  type: ActionTypeKeys;
  isAuthenticatd?: boolean;
  user?: IUser;
}

export interface ICustomError {
  response: AxiosResponse;
}

//TODO: any should remove
interface SendMessageAction {
  type: ActionTypeKeys;
  payload: IUser | ICustomError | AuthState | any;
}

export type ActionTypes = SendMessageAction;
