import { ActionTypeKeys, ActionTypes, profileState } from "../types";

const initialState: profileState = {
  profile: undefined,
  profiles: null,
  loading: false
};

export default (state = initialState, action: ActionTypes): profileState => {
  switch (action.type) {
    case ActionTypeKeys.PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case ActionTypeKeys.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case ActionTypeKeys.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: undefined
      };
    default:
      return state;
  }
};
