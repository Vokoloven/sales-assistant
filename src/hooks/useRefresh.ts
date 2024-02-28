import {useRecoverUserQuery} from '../redux/api/authApi';
import {localStorageService} from '../redux/service/localStorageService';
import {InitialState} from '../redux/slice/authSlice';
import type {IAccessDTO} from '../submodules/interfaces/dto/auth/iaccess.interface';

export const useRefresh = () => {
  const {getLocalStorage} = localStorageService<typeof InitialState.Access, IAccessDTO>();

  const access = getLocalStorage(InitialState.Access);

  useRecoverUserQuery(undefined, {skip: !access});
};
