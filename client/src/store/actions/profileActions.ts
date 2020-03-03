import { Dispatch } from "redux";
import axios, { AxiosResponse, AxiosError } from "axios";
import { ActionTypeKeys, ActionTypes, profileState } from "../types";
import { ApiRoutes } from "../../constants";

export const getCurrentProfile = (): Dispatch<any> => (dispatch: any): any => {
  dispatch(setProfileLoading());
  axios
    .get(ApiRoutes.PROFILE)
    .then((res: AxiosResponse) =>
      dispatch({
        type: ActionTypeKeys.GET_PROFILE,
        payload: res.data
      })
    )
    .catch((err: AxiosError) =>
      dispatch({
        type: ActionTypeKeys.GET_PROFILE,
        payload: {}
      })
    );
};

export const setProfileLoading = (): ActionTypes => {
  return {
    type: ActionTypeKeys.PROFILE_LOADING
  };
};

export const clearCurrentProfile = (): ActionTypes => {
  return {
    type: ActionTypeKeys.CLEAR_CURRENT_PROFILE
  };
};
