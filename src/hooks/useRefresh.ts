import {useAuth} from "./useAuth";
import {useRecoverUserQuery} from "../redux/api/authApi";

export const useRefresh = () => {
  const {access} = useAuth();

  useRecoverUserQuery(undefined, {skip: !access});
};
