import {AuthRoutes} from '@/submodules/enums/routes/auth-routes.enum';
import {BaseRoutes} from '@/submodules/enums/routes/base-routes.enum';
import type {ILoginRequestDTO} from '@/submodules/interfaces/dto/auth/iadmin-login-request.interface';

import {HTTP_Methods, Headers} from '../constants';

export const authService = () => {
  const login = async <T>(data: ILoginRequestDTO): Promise<T> => {
    try {
      const response = await fetch(
        `${BaseRoutes.BaseUrl}${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.Login}`,
        {
          method: HTTP_Methods.POST,
          headers: Headers.ContentType,
          body: JSON.stringify(data),
        },
      );

      return await response.json();
    } catch (error) {
      throw new Error('Unknown error occurred');
    }
  };

  return {login};
};
