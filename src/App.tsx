import { Routes, Navigate} from 'react-router-dom';
import { Suspense} from 'react';
import {AuthRoutes} from 'submodules/enums/routes/auth-routes.enum';
import './design/settings/reset.scss';


// const Login = lazy(() => import('pages/Login/Login'));


function App() {
  return   <>
    <Suspense fallback={<div>Loading...</div>}>
      <Navigate
        replace={true}
        to={AuthRoutes.Login}
      />
      <Routes>
        {/* <Route
          path={AuthRoutes.Login}
          element={<Login />}
        ></Route> */}
      </Routes>
    </Suspense>
  </>;
}

export default App;
