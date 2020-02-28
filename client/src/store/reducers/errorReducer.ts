import { GET_ERRORS, ActionTypes, ErrorState } from "../types";
const initialState: ErrorState = {};

export default function(state = initialState, action: ActionTypes): ErrorState {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
