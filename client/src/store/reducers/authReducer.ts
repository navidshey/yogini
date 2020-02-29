import { ActionTypeKeys ,ActionTypes, RegisterState } from "../types";

const initialState: RegisterState = {
  isAuthenticatd: false,
  user: undefined,
  type: ActionTypeKeys.NOACTION
};

export default function(state = initialState, action: ActionTypes): RegisterState {

  switch (action.type) {
    case ActionTypeKeys.REGISTER_DONE :
      return {isAuthenticatd: true, type: ActionTypeKeys.DONE};
      case ActionTypeKeys.SERVER_ERROR:
        return { isAuthenticatd: false, type: ActionTypeKeys.SERVER_ERROR }
    default:
      return state;
  }
}
