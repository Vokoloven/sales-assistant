import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit";

import {login} from "./api/authApi";
import authSlice from "./slice/authSlice";

const rootReducer = combineReducers({
  [login.reducerPath]: login.reducer,
  [authSlice.name]: authSlice.name,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(login.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
