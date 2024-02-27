import type {IAccessDTO} from 'submodules/interfaces/dto/auth/iaccess.interface';

import {localStorageService} from '../service/localStorageService';
import {InitialState} from '../slice/authSlice';
import {STATUS_CODE} from '../utils';

const {getLocalStorage} = localStorageService<typeof InitialState.Access, IAccessDTO>();

export const getPreparedHeaders = (headers: Headers) => {
  const parsedTokens = getLocalStorage(InitialState.Access);

  if (parsedTokens?.accessToken) {
    headers.set('authorization', `Bearer ${parsedTokens?.accessToken}`);
  }

  return headers;
};

export const getBody = () => {
  const parsedTokens = getLocalStorage(InitialState.Access);

  return {token: parsedTokens?.refreshToken};
};

export const isAccessRestricted = (statusCode: number): boolean => {
  if (statusCode === STATUS_CODE.FORBIDDEN || statusCode === STATUS_CODE.UNAUTHORIZED) return true;

  return false;
};
