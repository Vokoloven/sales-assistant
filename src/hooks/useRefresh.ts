import {useRecoverUserQuery} from "../redux/api/authApi";

import {useAuth} from "./useAuth";

export const useRefresh = () => {
  const {access} = useAuth();

  useRecoverUserQuery(undefined, {skip: !access});
};
