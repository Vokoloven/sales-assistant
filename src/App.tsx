import {lazy, Suspense} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {AuthRoutes} from '@/submodules/enums/routes/auth-routes.enum';

import {useRefresh} from './hooks/useRefresh';
import {useTheme} from './hooks/useTheme';
import {ProtectedRouteType} from './routes/constants';
import ProtectedRoute from './routes/ProtectedRoute';

const Login = lazy(() => import('@/pages/Login/Login'));
const Feed = lazy(() => import('@/pages/Feed/Feed'));
const NotFound = lazy(() => import('@/components/NotFound/NotFound'));

function App() {
  useTheme();
  useRefresh();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={AuthRoutes.Login}
                replace
              />
            }
          />
          <Route
            index
            path={AuthRoutes.Login}
            element={
              <ProtectedRoute type={ProtectedRouteType.Public}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={AuthRoutes.Feed}
            element={
              <ProtectedRoute type={ProtectedRouteType.Private}>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path={AuthRoutes.NotFound}
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
