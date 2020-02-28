import axios, { AxiosError, AxiosResponse } from "axios";
import { GET_ERRORS, ActionTypes } from "../types";

export const registerUser = (userData: any, history: any): any => {
  console.log("authactions 1");
  return function(dispatch: any) {
    axios
      .post("/api/users/register", userData)
      .then((response: AxiosResponse) => history.push("/login"))
      .catch((err: AxiosError) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response
        });
      });
  };
};
