import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit";

import {adminApi} from "./api/adminApi";
import {upworkFeedsApi} from "./api/upworkFeedsApi";
import slice from "./slice/slice";

const rootReducer = combineReducers({
  [adminApi.reducerPath]: adminApi.reducer,
  [slice.name]: slice.reducer,
  [upworkFeedsApi.reducerPath]: upworkFeedsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminApi.middleware, upworkFeedsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
