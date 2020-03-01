import {
  ActionTypeKeys,
  AuthState,
  ICustomError,
  ActionTypes,
  IUser
} from "../types";
import { Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { ApplicationRoutes, ApiRoutes, LocalStorage } from "./../../constants/";

//TODO: dispatch types should be proper
export const registerUser = (
  userData: any,
  history: any
): Dispatch<AuthState> => (dispatch: any): any => {
  axios
    .post(ApiRoutes.REGISTER, userData)
    .then(() => history.push(ApplicationRoutes.LOGIN))
    .catch((err: ICustomError) => {
      dispatch(catchError(err));
    });
};

export const loginUser = (userData: any): Dispatch<any> => (
  dispatch: any
): any => {
  axios
    .post(ApiRoutes.LOGIN, userData)
    .then((res: AxiosResponse) => {
      //Save to localstorage
      const { token } = res.data;
      localStorage.setItem(LocalStorage.JWTTOKEN, token);
      // Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode<IUser>(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err: ICustomError) => {
      dispatch(catchError(err));
    });
};

export const logoutUser = (): Dispatch<AuthState> => (dispatch: any): any => {
  localStorage.removeItem(LocalStorage.JWTTOKEN);
  setAuthToken(false);
  dispatch(setCurrentUser());
};

const catchError = (err: ICustomError): ActionTypes => {
  return {
    type: ActionTypeKeys.GET_ERRORS,
    payload: err.response.data
  };
};

export const setCurrentUser = (decoded?: IUser) => {
  return {
    type: ActionTypeKeys.SET_CURRENT_USER,
    payload: decoded
  };
};
