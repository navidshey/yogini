import { IUser } from "../api/auth/models";

// src/store/chat/types.ts

export enum ActionTypeKeys {
  NOACTION="NOACTION",
  DONE="DONE",
  REGISTER_DONE= "REGISTER_DONE",
  GET_ERRORS = "GET_ERRORS",
  SERVER_ERROR = "SERVER_ERROR"
}

export interface Message {
  user: string;
  message: string;
  timestamp: number;
}

export interface RegisterState {
  type: ActionTypeKeys; 
  isAuthenticatd?: boolean;
  user?: IUser;
}

export interface ErrorState  {}

interface SendMessageAction {
  type: ActionTypeKeys;
  payload: Message | Error;
}

export type ActionTypes = SendMessageAction ;
