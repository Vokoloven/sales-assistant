import {Navigate, Outlet} from "react-router-dom";

import {ProtectedRouteType} from "./constants";
import {AppRoutes} from "../AppRoutes";
import {useAuth} from "../hooks/useAuth";
import {KeyExtractor} from "../utils/types/keyExtractor";

interface IProps {
  type: KeyExtractor<typeof ProtectedRouteType>;
}

const ProtectedRoute = ({type}: IProps) => {
  const {access} = useAuth();

  if (type === ProtectedRouteType.Private && Boolean(!access)) {
    return (
      <Navigate
        to={`/${AppRoutes.Login}`}
        replace
      />
    );
  } else if (type === ProtectedRouteType.Public && Boolean(access)) {
    return (
      <Navigate
        to={`/${AppRoutes.Feed}`}
        replace
      />
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
