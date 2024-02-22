import {configureStore} from "@reduxjs/toolkit";
import {persistStore} from "redux-persist";

import {persistedAuth} from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
