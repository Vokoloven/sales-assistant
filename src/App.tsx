import {lazy, Suspense} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import {AppRoutes} from "./AppRoutes";
import Progress from "./components/Progress/Progress";
import {useRefresh} from "./hooks/useRefresh";
import {useTheme} from "./hooks/useTheme";
import {ProtectedRouteType} from "./routes/constants";
import Layout from "./routes/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

const Login = lazy(() => import("./pages/Login/Login"));
const SharedLayout = lazy(() => import("./pages/SharedLayout/SharedLayout"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const UpworkFeed = lazy(() => import("./pages/UpworkFeed/UpworkFeed"));
const UpworkFeedDetail = lazy(() => import("./pages/UpworkFeedDetail/UpworkFeedDetail"));

function App() {
  const {themeSwitcher} = useTheme();
  useRefresh();

  return (
    <>
      <Suspense fallback={<Progress />}>
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
                element={<SharedLayout themeSwitcher={themeSwitcher} />}
              >
                <Route
                  index
                  element={<UpworkFeed />}
                />
                <Route
                  path={AppRoutes.FeedIndex}
                  element={<UpworkFeedDetail />}
                />
              </Route>
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
