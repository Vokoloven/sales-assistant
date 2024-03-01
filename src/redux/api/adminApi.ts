import type {QueryReturnValue} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import type {BaseQueryFn, FetchArgs, FetchBaseQueryMeta} from "@reduxjs/toolkit/query";
import {createApi} from "@reduxjs/toolkit/query/react";

import {AppConfig} from "../../AppConfig";
import type {IAccessDTO} from "../../submodules/interfaces/dto/auth/iaccess.interface";
import type {ILoginResponseDTO} from "../../submodules/interfaces/dto/auth/ilogin-response.interfaces";
import type {IApiResponseGenericDTO} from "../../submodules/interfaces/dto/common/iapi-response.interface";
import {IApiResponseDTO} from "../../submodules/interfaces/dto/common/iapi-response.interface";
import {localStorageService} from "../service/localStorageService";
import {InitialState} from "../slice/authSlice";
import {logOut} from "../slice/authSlice";
import {HTTP_METHODS, STATUS_CODE} from "../utils";

import {baseQuery, getBody, isAccessRestricted} from "./utils";

const {setLocalStorage} = localStorageService<typeof InitialState.Access, IAccessDTO>();

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  IApiResponseGenericDTO<ILoginResponseDTO> | IApiResponseDTO,
  {data: IApiResponseDTO}
> = async (args, api, extraOptions) => {
  let result = (await baseQuery(args, api, extraOptions)) as QueryReturnValue<
    IApiResponseDTO,
    {data: IApiResponseDTO},
    FetchBaseQueryMeta
  >;

  const error = result?.error;

  if (error && error.data.statusCode !== STATUS_CODE.SUCCESS) {
    if (isAccessRestricted(error.data.statusCode) && typeof args !== "string" && args.url !== AppConfig.Login) {
      const refreshTokenResult = (await baseQuery(
        {
          url: AppConfig.RefreshToken,
          method: HTTP_METHODS.PUT,
          body: {...getBody()},
        },
        api,
        extraOptions,
      )) as QueryReturnValue<IApiResponseGenericDTO<ILoginResponseDTO>, {data: IApiResponseDTO}, FetchBaseQueryMeta>;
      if (refreshTokenResult.data) {
        const {access} = refreshTokenResult.data.data;
        setLocalStorage(InitialState.Access, access);

        result = (await baseQuery(args, api, extraOptions)) as QueryReturnValue<
          IApiResponseGenericDTO<ILoginResponseDTO>,
          {data: IApiResponseDTO},
          FetchBaseQueryMeta
        >;

        return result;
      } else {
        api.dispatch(logOut());
      }

      return {error: refreshTokenResult.error};
    }
  }

  return result;
};

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
});
