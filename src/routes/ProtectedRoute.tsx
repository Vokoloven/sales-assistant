import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

import {AppRoutes} from "AppRoutes";
import {KeyExtractor} from "utils/types/keyExtractor";

import {ProtectedRouteType} from "./constants";
import {selectAccess} from "../redux/slice/authSlice";

interface IProps {
  children?: React.ReactNode;
  type: KeyExtractor<typeof ProtectedRouteType>;
}

const ProtectedRoute = ({children, type}: IProps) => {
  const access = useSelector(selectAccess);

  if (type === ProtectedRouteType.Private && !access) {
    return (
      <Navigate
        to={`/${AppRoutes.Login}`}
        replace
      />
    );
  } else if (type === ProtectedRouteType.Public && access) {
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
