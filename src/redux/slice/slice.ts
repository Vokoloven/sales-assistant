import {createSlice} from "@reduxjs/toolkit";

import type {IAccountDTO} from "../../submodules/interfaces/dto/account/iaccount.interface";
import type {IAccessDTO} from "../../submodules/interfaces/dto/auth/iaccess.interface";
import {loginApi} from "../api/authApi";
import {recoverUserApi} from "../api/authApi";
import {localStorageService} from "../service/localStorageService";
import {RootState} from "../store";

export type Nullable<T> = T | null;

export const InitialState = {
  Access: "access",
  Account: "account",
  IsLogged: "isLogged",
} as const;

export interface IInitialState {
  [InitialState.Access]: Nullable<IAccessDTO>;
  [InitialState.Account]: Nullable<IAccountDTO>;
  [InitialState.IsLogged]: boolean;
}

const initialState: IInitialState = {
  [InitialState.Access]: null,
  [InitialState.Account]: null,
  [InitialState.IsLogged]: false,
} as const;

const {setLocalStorage, removeLocalStorage} = localStorageService<typeof InitialState.Access, IAccessDTO>();

const slice = createSlice({
  name: "root",
  initialState,
  reducers: {
    logOut: (state) => {
      removeLocalStorage(InitialState.Access);
      state[InitialState.IsLogged] = false;
      state[InitialState.Access] = null;
      state[InitialState.Account] = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(loginApi.endpoints.login.matchFulfilled, (state, {payload}) => {
      setLocalStorage(InitialState.Access, payload.data.access);
      state[InitialState.Account] = payload.data.account;
      state[InitialState.Access] = payload.data.access;
      state[InitialState.IsLogged] = true;
    });
    builder.addMatcher(recoverUserApi.endpoints.recoverUser.matchFulfilled, (state, {payload}) => {
      state[InitialState.Account] = payload.data.account;
      state[InitialState.IsLogged] = true;
    });
  },
});

export const {logOut} = slice.actions;

export default slice;

export const selectIsLogged = (state: RootState) => state.root.isLogged;
export const selectUser = (state: RootState) => state.root.account;
