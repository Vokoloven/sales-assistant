import {Navigate, Outlet} from 'react-router-dom';

import {ProtectedRouteType} from './constants';
import {AppRoutes} from '../AppRoutes';
import {useAuth} from '../hooks/useAuth';
import {localStorageService} from '../redux/service/localStorageService';
import {InitialState} from '../redux/slice/authSlice';
import {IAccessDTO} from '../submodules/interfaces/dto/auth/iaccess.interface';
import {KeyExtractor} from '../utils/types/keyExtractor';

interface IProps {
  type: KeyExtractor<typeof ProtectedRouteType>;
}

const ProtectedRoute = ({type}: IProps) => {
  const {getLocalStorage} = localStorageService<typeof InitialState.Access, IAccessDTO>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {test} = useAuth();
  console.log(test);

  const access = getLocalStorage(InitialState.Access);

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
