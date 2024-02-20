import {AuthRoutes} from '@/submodules/enums/routes/auth-routes.enum';
import {BaseRoutes} from '@/submodules/enums/routes/base-routes.enum';
import type {ILoginRequestDTO} from '@/submodules/interfaces/dto/auth/iadmin-login-request.interface';
import type {ITokenRequestDTO} from '@/submodules/interfaces/dto/auth/irefresh-token-request.interface';

import {HTTP_Methods, Headers} from '../constants';

export const authService = () => {
  const login = async <T>(dto: ILoginRequestDTO): Promise<T> => {
    try {
      const response = await fetch(
        `${BaseRoutes.BaseUrl}${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.Login}`,
        {
          method: HTTP_Methods.POST,
          headers: Headers.ContentType,
          body: JSON.stringify(dto),
        },
      );

      return await response.json();
    } catch (error) {
      throw new Error('Unknown error occurred');
    }
  };

  const refresh = async <T>(dto: ITokenRequestDTO): Promise<T> => {
    try {
      const response = await fetch(
        `${BaseRoutes.BaseUrl}${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.RefreshToken}`,
        {
          method: HTTP_Methods.PUT,
          headers: Headers.ContentType,
          body: JSON.stringify(dto),
        },
      );

      return await response.json();
    } catch (error) {
      throw new Error('Unknown error occurred');
    }
  };

  return {login, refresh};
};
