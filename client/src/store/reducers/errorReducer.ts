import { ActionTypeKeys, ActionTypes, ICustomError } from "../types";
const initialState: any = {};

export default function(
  state = initialState,
  action: ActionTypes
): ICustomError {
  switch (action.type) {
    case ActionTypeKeys.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
