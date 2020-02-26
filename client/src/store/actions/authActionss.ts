import { TEST_DISPATCH } from '../types';

export const registerUser = (userData: any) =>{
    return {
        type: TEST_DISPATCH,
        payload: userData
    }
}