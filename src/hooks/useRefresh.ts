import {useRecoverUserQuery} from "../redux/api/authApi";
import {localStorageService} from "../redux/service/localStorageService";
import {InitialState} from "../redux/slice/authSlice";
import type {IInitialState} from "../redux/slice/authSlice";

export const useRefresh = () => {
  const {getLocalStorage} = localStorageService<typeof InitialState.Access, IInitialState>();

  const access = getLocalStorage(InitialState.Access);

  useRecoverUserQuery(undefined, {skip: !access});
};
