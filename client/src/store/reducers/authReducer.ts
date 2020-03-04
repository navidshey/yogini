import { ActionTypeKeys, ActionTypes, AuthState } from "../types";
import { isEmpty } from "../../validation/is-empty";

const initialState: AuthState = {
  isAuthenticatd: false,
  user: undefined
  // type: ActionTypeKeys.NOACTION
};

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
