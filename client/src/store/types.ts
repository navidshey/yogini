// src/store/chat/types.ts

export const GET_ERRORS = "GET_ERRORS";

export interface Message {
  user: string;
  message: string;
  timestamp: number;
}

export interface RegisterState {
  isAuthenticatd: boolean;
  user: any;
}

export interface ErrorState {}

interface SendMessageAction {
  type: string;
  payload: Message;
}

export type ActionTypes = SendMessageAction;
