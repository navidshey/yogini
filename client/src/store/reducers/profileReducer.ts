import { ActionTypeKeys, ActionTypes, profileState } from "../types";
import { initialProfileState, initialProfile } from "./initialState";

const initialState: profileState = initialProfileState;

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
    case ActionTypeKeys.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case ActionTypeKeys.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: initialProfile
      };
    default:
      return state;
  }
};
