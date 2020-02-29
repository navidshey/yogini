import { registerApi } from '../../api/auth/authApi';
import { ActionTypeKeys, RegisterState } from "../types";
import { IRegister } from './../../api/auth/models';
import { Dispatch } from 'redux';

export const registerUser = (userData: any, history: any): Dispatch<RegisterState> =>
(dispatch: any): any => {
console.log("authaction")
     registerApi(userData)
    .then((Response:IRegister) =>  history.push("/login"))
    .catch((err: IRegister) => {
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err
      });
    });

};
