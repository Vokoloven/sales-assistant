import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

import type {IAccountDTO} from "submodules/interfaces/dto/account/iaccount.interface";
import type {IAccessDTO} from "submodules/interfaces/dto/auth/iaccess.interface";

import {RootState} from "../store";

type Nullable<T> = T | null;

export interface IInitialState {
  access: Nullable<IAccessDTO>;
  account: Nullable<IAccountDTO>;
}

const slice = createSlice({
  name: "auth",
  initialState: {account: null, access: null} as IInitialState,
  reducers: {
    setCredentials: (
      state,
      {payload: {account, access}}: PayloadAction<{account: IAccountDTO; access: IAccessDTO}>,
    ) => {
      state.account = account;
      state.access = access;
    },
  },
});

export const {setCredentials} = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.account;
