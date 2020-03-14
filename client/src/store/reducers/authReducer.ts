import { ActionTypeKeys, ActionTypes, AuthState } from "../types";
import { isEmpty } from "../../validation/is-empty";
import { initialAuthState } from "./initialState";

const initialState: AuthState = initialAuthState;

export default function(state = initialState, action: ActionTypes): AuthState {
  switch (action.type) {
    case ActionTypeKeys.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticatd: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
