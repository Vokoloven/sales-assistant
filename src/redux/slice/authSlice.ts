import {createSlice} from "@reduxjs/toolkit";
// import type {PayloadAction} from "@reduxjs/toolkit";

import type {IAccountDTO} from "submodules/interfaces/dto/account/iaccount.interface";
import type {IAccessDTO} from "submodules/interfaces/dto/auth/iaccess.interface";

import {login} from "../api/authApi";
import {localStorageService} from "../service/localStorageService";
import {RootState} from "../store";

type Nullable<T> = T | null;

const InitialState = {
  Access: "access",
  Account: "account",
} as const;

export interface IInitialState {
  [InitialState.Access]: Nullable<IAccessDTO>;
  [InitialState.Account]: Nullable<IAccountDTO>;
}

const {setLocalStorage} = localStorageService<typeof InitialState.Access, IAccessDTO>();

const slice = createSlice({
  name: "auth",
  initialState: {account: null, access: null} as IInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(login.endpoints.login.matchFulfilled, (state, {payload}) => {
      setLocalStorage(InitialState.Access, payload.data.access);
      state.account = payload.data.account;
      state.access = payload.data.access;
    });
  },
});

// export const {setCredentials} = slice.actions;

export default slice;

export const selectCurrentUser = (state: RootState) => state.auth.account;
