import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {AppConfig} from "AppConfig";
import type {ILoginRequestDTO} from "submodules/interfaces/dto/auth/iadmin-login-request.interface";
import type {ILoginResponseDTO} from "submodules/interfaces/dto/auth/ilogin-response.interfaces";

import {headers} from "./headers/headers";

interface ILoginResponseActualData {
  data: ILoginResponseDTO;
}

const baseQuery = fetchBaseQuery({
  baseUrl: AppConfig.BaseUrl,
  headers,
});

export const auth = createApi({
  reducerPath: "login",
  baseQuery: baseQuery,
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

export const {useLoginMutation} = auth;
