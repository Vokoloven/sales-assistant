import {useRecoverUserQuery} from "../redux/api/authApi";

import {useAuth} from "./useAuth";

export const useRefresh = () => {
  const {access, isLogged} = useAuth();

  useRecoverUserQuery(undefined, {skip: isLogged || !access});
};
