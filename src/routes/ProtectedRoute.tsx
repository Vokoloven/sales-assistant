import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

import {AppRoutes} from "@/AppRoutes";
import {authSelector} from "@/redux/selector/authSelector";
import {KeyExtractor} from "@/utils/types/keyExtractor";

import {ProtectedRouteType} from "./constants";

interface IProps {
  children?: React.ReactNode;
  type: KeyExtractor<typeof ProtectedRouteType>;
}

const ProtectedRoute = ({children, type}: IProps) => {
  const {isAuthorized} = useSelector(authSelector);

  if (type === ProtectedRouteType.Private && !isAuthorized) {
    return (
      <Navigate
        to={`/${AppRoutes.Login}`}
        replace
      />
    );
  } else if (type === ProtectedRouteType.Public && isAuthorized) {
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
