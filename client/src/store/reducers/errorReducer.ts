import { ActionTypeKeys, ActionTypes, ErrorState } from "../types";
const initialState: ErrorState = {};

export default function(state = initialState, action: ActionTypes): ErrorState {
  switch (action.type) {
    case ActionTypeKeys.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
