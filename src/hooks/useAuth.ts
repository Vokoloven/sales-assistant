/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {useMemo, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import {localStorageService} from '../redux/service/localStorageService';
import {selectIsLogged} from '../redux/slice/authSlice';
import {InitialState} from '../redux/slice/authSlice';
import {logOut} from '../redux/slice/authSlice';
import type {IAccessDTO} from '../submodules/interfaces/dto/auth/iaccess.interface';

export const useAuth = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLogged);

  const {getLocalStorage} = localStorageService<typeof InitialState.Access, IAccessDTO>();

  const test = getLocalStorage(InitialState.Access);

  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === InitialState.Access && isLogged) {
        dispatch(logOut());
      }
    };

    window.addEventListener('storage', handleStorageEvent);

    return () => window.removeEventListener('storage', handleStorageEvent);
  }, [isLogged]);

  return useMemo(() => ({test}), [test]);
};
