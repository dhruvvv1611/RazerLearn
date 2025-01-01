import { combineReducers} from "@reduxjs/toolkit";
import authRecuder from "../features/authSlice"
import { authApi } from "../features/api/authApi";
import { courseApi } from "@/features/api/courseApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  auth: authRecuder,
});

export default rootReducer;
