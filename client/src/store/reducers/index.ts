import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
