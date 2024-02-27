import {AppConfig} from 'AppConfig';
import type {IAccountResponseDTO} from 'submodules/interfaces/dto/account/iaccount-response.interfaces';
import type {ILoginRequestDTO} from 'submodules/interfaces/dto/auth/iadmin-login-request.interface';
import type {ILoginResponseDTO} from 'submodules/interfaces/dto/auth/ilogin-response.interfaces';
import type {IApiResponseGenericDTO} from 'submodules/interfaces/dto/common/iapi-response.interface';

import {adminApi} from './adminApi';
import {HTTP_METHODS} from '../utils';

export const loginApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IApiResponseGenericDTO<ILoginResponseDTO>, ILoginRequestDTO>({
      query: (credentials) => ({
        url: AppConfig.Login,
        method: HTTP_METHODS.POST,
        body: {...credentials},
      }),
    }),
  }),
});

export const recoverUserApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    recoverUser: builder.query<{data: IAccountResponseDTO}, void>({
      query: () => ({
        url: AppConfig.RecoverUser,
        method: HTTP_METHODS.GET,
      }),
    }),
  }),
});

export const {useLoginMutation} = loginApi;
export const {useRecoverUserQuery} = recoverUserApi;
