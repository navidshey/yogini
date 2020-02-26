// src/store/chat/types.ts

export const TEST_DISPATCH = 'TEST_DISPATCH';

export interface Message {
    user: string
    message: string
    timestamp: number
  }

  export interface RegisterState {
    messages: Message[]
  }

  interface SendMessageAction{
      type: typeof TEST_DISPATCH,
      payload: Message
  }

  export type RegisterActionTypes = SendMessageAction