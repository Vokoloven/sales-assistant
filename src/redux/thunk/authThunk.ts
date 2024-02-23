import {createAsyncThunk} from "@reduxjs/toolkit";

import {authService} from "service/httpServices/authService";
import type {IAccountDTO} from "submodules/interfaces/dto/account/iaccount.interface";
import type {IAccessDTO} from "submodules/interfaces/dto/auth/iaccess.interface";
import type {ILoginRequestDTO} from "submodules/interfaces/dto/auth/iadmin-login-request.interface";

import type {IAuthState} from "../slice/authSlice";

export interface ILoginResponseFullDTO {
  success: boolean;
  statusCode: number;
  data: {
    access: IAccessDTO;
    account: IAccountDTO;
    sessionId: string;
  } | null;
  error: {errorCode: string; filedsValidationErrors: null; paramsErrors: null} | null;
}

const auth = authService();

export const loginUserByEmail = createAsyncThunk<
  ILoginResponseFullDTO["data"],
  ILoginRequestDTO,
  {rejectValue: ILoginResponseFullDTO["error"] | unknown}
>(
  "auth/loginUserByEmail",
  async (dto, {rejectWithValue}) => {
    try {
      const response = auth.login<ILoginResponseFullDTO>(dto);

      const {data, success, error} = await response;

      if (!success) {
        throw {...error};
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue(error);
    }
  },
  {
    condition: (_, {getState}) => {
      const {
        auth: {isAuthorized},
      } = getState() as {auth: IAuthState};

      if (isAuthorized) {
        return false;
      }
    },
  },
);

export const refreshUser = createAsyncThunk<
  ILoginResponseFullDTO["data"],
  void,
  {rejectValue: ILoginResponseFullDTO["error"] | unknown; state: {auth: IAuthState}}
>(
  "auth/refreshUser",
  async (_, {rejectWithValue, getState}) => {
    try {
      const state = getState();

      const response = auth.refresh<ILoginResponseFullDTO>({token: state.auth.user!.access.refreshToken});

      const {data, success, error} = await response;

      if (!success) {
        throw {...error};
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue(error);
    }
  },
  {
    condition: (_, {getState}) => {
      const {
        auth: {isAuthorized},
      } = getState() as {auth: IAuthState};

      if (!isAuthorized) {
        return false;
      }
    },
  },
);
