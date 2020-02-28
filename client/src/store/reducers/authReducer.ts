import { ActionTypes, RegisterState } from "../types";
const initialState: RegisterState = {
  isAuthenticatd: false,
  user: {}
};

export default function(
  state = initialState,
  action: ActionTypes
): RegisterState {
  switch (action.type) {
    default:
      return state;
  }
}
