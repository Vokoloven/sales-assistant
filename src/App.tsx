import {lazy, Suspense} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import {ProtectedRouteType} from "routes/constants";

import {AppRoutes} from "./AppRoutes";
import {useTheme} from "./hooks/useTheme";
import {useRecoverUserQuery} from "./redux/api/authApi";
import {} from "./redux/api/authApi";

const Login = lazy(() => import("pages/Login/Login"));
const Feed = lazy(() => import("pages/Feed/Feed"));
const NotFound = lazy(() => import("pages/NotFound/NotFound"));
const Layout = lazy(() => import("routes/Layout"));
const ProtectedRoute = lazy(() => import("routes/ProtectedRoute"));

function App() {
  useRecoverUserQuery();

  useTheme();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
                element={<Feed />}
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
