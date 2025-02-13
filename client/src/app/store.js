import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import authApi from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      purchaseApi.middleware,
      courseProgressApi.middleware
    ),
});

export default store;

const initialApp = async () => {
  await store.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initialApp();
