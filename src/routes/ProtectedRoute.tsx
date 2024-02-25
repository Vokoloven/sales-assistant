import {Navigate, Outlet} from "react-router-dom";

import {AppRoutes} from "AppRoutes";
import {KeyExtractor} from "utils/types/keyExtractor";

import {ProtectedRouteType} from "./constants";

interface IProps {
  children?: React.ReactNode;
  type: KeyExtractor<typeof ProtectedRouteType>;
}

const ProtectedRoute = ({children, type}: IProps) => {
  if (type === ProtectedRouteType.Private) {
    return (
      <Navigate
        to={`/${AppRoutes.Login}`}
        replace
      />
    );
  } else if (type === ProtectedRouteType.Public) {
    return (
      <Navigate
        to={`/${AppRoutes.Feed}`}
        replace
      />
    );
  }
  return children ? (
    <>{children}</>
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
