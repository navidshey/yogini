import { TEST_DISPATCH, RegisterActionTypes } from '../types'
const initialState ={
    isAuthenticatd: false,
    user: {}
}

export default function(state=initialState, action: RegisterActionTypes){
    switch (action.type) {
        case TEST_DISPATCH:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}