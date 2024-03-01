import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit";

import {adminApi} from "./api/adminApi";
import {upworkFeeds} from "./api/feedApi";
import authSlice from "./slice/authSlice";

const rootReducer = combineReducers({
  [adminApi.reducerPath]: adminApi.reducer,
  [authSlice.name]: authSlice.reducer,
  [upworkFeeds.reducerPath]: upworkFeeds.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminApi.middleware, upworkFeeds.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
