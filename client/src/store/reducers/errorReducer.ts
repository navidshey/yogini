import { ActionTypeKeys, ActionTypes, ICustomError } from "../types";
import { initialErrorState } from "./initialState";
const initialState: any = initialErrorState;

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
