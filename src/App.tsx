import {lazy, Suspense} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {AuthRoutes} from '@/submodules/enums/routes/auth-routes.enum';

import {useTheme} from './hooks/useTheme';

const Login = lazy(() => import('@/pages/Login/Login'));
const Feed = lazy(() => import('@/pages/Feed/Feed'));
const NotFound = lazy(() => import('@/components/NotFound/NotFound'));

function App() {
  useTheme();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigate
          replace={true}
          to={AuthRoutes.Login}
        />
        <Routes>
          <Route
            path={AuthRoutes.Login}
            element={<Login />}
          />
          <Route
            path={AuthRoutes.Feed}
            element={<Feed />}
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
