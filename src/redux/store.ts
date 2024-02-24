import {configureStore, combineReducers} from "@reduxjs/toolkit";

import {authSlice} from "./slice/authSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
