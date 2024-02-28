import {lazy, Suspense} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {AppRoutes} from './AppRoutes';
import {useRefresh} from './hooks/useRefresh';
import {useTheme} from './hooks/useTheme';
import {ProtectedRouteType} from './routes/constants';
import Layout from './routes/Layout';
import ProtectedRoute from './routes/ProtectedRoute';

const Login = lazy(() => import('./pages/Login/Login'));
const Feed = lazy(() => import('./pages/Feed/Feed'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  const {themeSwitcher} = useTheme();
  useRefresh();

  return (
    <>
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              index
              element={
                <Navigate
                  to={AppRoutes.Login}
                  replace
                />
              }
            />
            <Route element={<ProtectedRoute type={ProtectedRouteType.Public} />}>
              <Route
                path={AppRoutes.Login}
                element={<Login />}
              />
            </Route>
            <Route element={<ProtectedRoute type={ProtectedRouteType.Private} />}>
              <Route
                path={AppRoutes.Feed}
                element={<Feed themeSwitcher={themeSwitcher} />}
              />
            </Route>
            <Route
              path={AppRoutes.NotFound}
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
