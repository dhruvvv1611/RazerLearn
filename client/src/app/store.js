import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import authApi from "@/features/api/authApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware),
});

export default store;
