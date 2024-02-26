import {useMemo} from "react";
import {useSelector} from "react-redux";

import {selectAccount} from "../redux/slice/authSlice";

export const useAuth = () => {
  const user = useSelector(selectAccount);

  return useMemo(() => ({user}), [user]);
};
