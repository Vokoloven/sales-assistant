import {Navigate, Outlet} from "react-router-dom";

import {AppRoutes} from "AppRoutes";
import {useAuth} from "hooks/useAuth";
import {KeyExtractor} from "utils/types/keyExtractor";

import {ProtectedRouteType} from "./constants";

interface IProps {
  type: KeyExtractor<typeof ProtectedRouteType>;
}

const ProtectedRoute = ({type}: IProps) => {
  const {user} = useAuth();

  if (type === ProtectedRouteType.Private && !user) {
    return (
      <Navigate
        to={`/${AppRoutes.Login}`}
        replace
      />
    );
  } else if (type === ProtectedRouteType.Public && user) {
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
