import {lazy, Suspense} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {AppRoutes} from './AppRoutes';
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
                to={AppRoutes.Login}
                replace
              />
            }
          />
          <Route
            index
            path={AppRoutes.Login}
            element={
              <ProtectedRoute type={ProtectedRouteType.Public}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.Feed}
            element={
              <ProtectedRoute type={ProtectedRouteType.Private}>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.NotFound}
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
