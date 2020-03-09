import { Dispatch } from "redux";
import axios, { AxiosResponse, AxiosError } from "axios";
import { ActionTypeKeys, ActionTypes } from "../types";
import { ApiRoutes, ApplicationRoutes } from "../../constants";

export const getCurrentProfile = (): Dispatch<ActionTypes> => (
  dispatch: any
): any => {
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

export const getProfileByHandle = (handle: string): Dispatch<ActionTypes> => (
  dispatch: any
): any => {
  dispatch(setProfileLoading());
  axios
    .get(`${ApiRoutes.GETPROFILEHANDLE}/${handle}`)
    .then((res: AxiosResponse) =>
      dispatch({
        type: ActionTypeKeys.GET_PROFILE,
        payload: res.data
      })
    )
    .catch((err: AxiosError) =>
      dispatch({
        type: ActionTypeKeys.GET_PROFILE,
        payload: null
      })
    );
};

export const createProfile = (profileData: any, history: any) => (
  dispatch: Dispatch<ActionTypes>
) => {
  axios
    .post(ApiRoutes.PROFILE, profileData)
    .then((res: AxiosResponse) => history.push(ApplicationRoutes.DASHBOARD))
    .catch((err: AxiosError) =>
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addExperience = (profileData: any, history: any) => (
  dispatch: Dispatch<ActionTypes>
) => {
  axios
    .post(ApiRoutes.ADDEXPERIENCE, profileData)
    .then(res => history.push(ApplicationRoutes.DASHBOARD))
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteExperience = (id: string) => (
  dispatch: Dispatch<ActionTypes>
) => {
  axios
    .delete(`${ApiRoutes.ADDEXPERIENCE}/${id}`)
    .then(res =>
      dispatch({
        type: ActionTypeKeys.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addEducation = (profileData: any, history: any) => (
  dispatch: Dispatch<ActionTypes>
) => {
  axios
    .post(ApiRoutes.ADDEDUCATION, profileData)
    .then(res => history.push(ApplicationRoutes.DASHBOARD))
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteEducation = (id: string) => (
  dispatch: Dispatch<ActionTypes>
) => {
  axios
    .delete(`${ApiRoutes.ADDEDUCATION}/${id}`)
    .then(res =>
      dispatch({
        type: ActionTypeKeys.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getProfiles = () => (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setProfileLoading());
  axios
    .get(ApiRoutes.GETPROFILES)
    .then(res =>
      dispatch({
        type: ActionTypeKeys.GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteAccount = (): Dispatch<ActionTypes> => (
  dispatch: any
): any => {
  if (window.confirm("Are you sure? this can not be undone!")) {
    axios
      .delete(ApiRoutes.PROFILE)
      .then((res: AxiosResponse) => {
        dispatch({
          type: ActionTypeKeys.SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch((err: AxiosError) =>
        dispatch({
          type: ActionTypeKeys.GET_ERRORS,
          payload: err.response.data
        })
      );
  }
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
