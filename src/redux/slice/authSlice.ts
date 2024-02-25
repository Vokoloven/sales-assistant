import {createSlice} from "@reduxjs/toolkit";

import type {IAccountDTO} from "submodules/interfaces/dto/account/iaccount.interface";
import type {IAccessDTO} from "submodules/interfaces/dto/auth/iaccess.interface";

import {loginApi} from "../api/authApi";
import {recoverUserApi} from "../api/authApi";
import {localStorageService} from "../service/localStorageService";
import {RootState} from "../store";

type Nullable<T> = T | null;

export const InitialState = {
  Access: "access",
  Account: "account",
} as const;

export interface IInitialState {
  [InitialState.Access]: Nullable<IAccessDTO>;
  [InitialState.Account]: Nullable<IAccountDTO>;
}

const {setLocalStorage, removeLocalStorage} = localStorageService<typeof InitialState.Access, IAccessDTO>();

const slice = createSlice({
  name: "auth",
  initialState: {account: null, access: null} as IInitialState,
  reducers: {
    logOut: (state) => {
      state[InitialState.Access] = null;
      state[InitialState.Account] = null;
      removeLocalStorage(InitialState.Access);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(loginApi.endpoints.login.matchFulfilled, (state, {payload}) => {
      setLocalStorage(InitialState.Access, payload.data.access);
      state[InitialState.Account] = payload.data.account;
      state[InitialState.Access] = payload.data.access;
    });
    builder.addMatcher(recoverUserApi.endpoints.recoverUser.matchFulfilled, (state, {payload}) => {
      console.log(payload.data);
      state[InitialState.Account] = payload.data.account;
    });
  },
});

export const {logOut} = slice.actions;

export default slice;

export const selectAccount = (state: RootState) => state.auth.account;
