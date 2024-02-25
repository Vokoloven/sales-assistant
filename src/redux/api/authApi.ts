import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {AppConfig} from "AppConfig";
import {RootState} from "redux/store";
import type {ILoginRequestDTO} from "submodules/interfaces/dto/auth/iadmin-login-request.interface";
import type {ILoginResponseDTO} from "submodules/interfaces/dto/auth/ilogin-response.interfaces";

interface ILoginResponseActualData {
  data: ILoginResponseDTO;
}

import {headers} from "./headers/headers";

const baseQuery = fetchBaseQuery({
  baseUrl: AppConfig.BaseUrl,
  headers,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.access?.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const login = createApi({
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponseActualData, ILoginRequestDTO>({
      query: (credentials) => ({
        url: AppConfig.Login,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginMutation} = login;
