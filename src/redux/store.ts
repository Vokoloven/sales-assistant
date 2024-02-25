import {configureStore} from "@reduxjs/toolkit";

import {login} from "./api/authApi";
import authSlice from "./slice/authSlice";

export const store = configureStore({
  reducer: {[login.reducerPath]: login.reducer, [authSlice.name]: authSlice.reducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(login.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
