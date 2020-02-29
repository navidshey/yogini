import axios from "axios";
import { registerApiUrl } from './apiUrl';
import { IRegister } from './models';



export const registerApi = (userData: any) : Promise<IRegister> => {
    return axios.post(registerApiUrl, userData);
    };


