import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';

import {authSelector} from '@/redux/selector/authSelector';
import {AuthRoutes} from '@/submodules/enums/routes/auth-routes.enum';
import {KeyExtractor} from '@/utils/types/keyExtractor';

import {ProtectedRouteType} from './constants';

interface IProps {
  children?: React.ReactNode;
  type: KeyExtractor<typeof ProtectedRouteType>;
}

const ProtectedRoute = ({children, type}: IProps) => {
  const {isAuthorized} = useSelector(authSelector);

  if (type === ProtectedRouteType.Private && !isAuthorized) {
    return (
      <Navigate
        to={`/${AuthRoutes.Login}`}
        replace
      />
    );
  } else if (type === ProtectedRouteType.Public && isAuthorized) {
    return (
      <Navigate
        to={`/${AuthRoutes.Feed}`}
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
