import { combineReducers} from "@reduxjs/toolkit";
import authRecuder from "../features/authSlice"
import { authApi } from "../features/api/authApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authRecuder,
});

export default rootReducer;
