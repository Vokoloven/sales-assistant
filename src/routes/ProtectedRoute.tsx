import {Navigate, Outlet} from "react-router-dom";

import {AppRoutes} from "AppRoutes";
import {useAuth} from "hooks/useAuth";
import {KeyExtractor} from "utils/types/keyExtractor";

import {ProtectedRouteType} from "./constants";

interface IProps {
  children?: React.ReactNode;
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

// import {Outlet, useLocation, Navigate} from "react-router-dom";

// import {AppRoutes} from "AppRoutes";
// import {useAuth} from "hooks/useAuth";

// const ProtectedRoute = () => {
//   const {user} = useAuth();
//   const location = useLocation();

//   if (user) return <Outlet />;

//   return (
//     <Navigate
//       to={AppRoutes.Login}
//       state={{from: location}}
//       replace
//     />
//   );
// };

// export default ProtectedRoute;
