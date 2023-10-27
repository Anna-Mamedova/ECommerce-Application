import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '../utils/routes';
import NotFound from '../views/not-found/notFound';
import {
  LOGIN_ROUTE,
  PRODUCT_ID_ROUTE,
  REGISTRATION_ROUTE,
  USER_PROFILE,
} from '../utils/consts';
import LogIn from '../views/authorization/log-in/LogIn';
import { AuthContext } from '../context';
import SignUp from '../views/authorization/sign-up/SignUp';
import DetailedProductPage from '../views/detailedPoductPage/DetailedProductPage';
import UserProfile from '../views/user-profile/UserProfile';

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);
  if (isAuth) {
    localStorage.setItem('isAuth', 'true');
  }
  const getIsAuth = localStorage.getItem('isAuth') === 'true';

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
      <Route
        path={REGISTRATION_ROUTE}
        element={isAuth ? <Navigate to="/" /> : <SignUp />}
      />
      <Route
        path={LOGIN_ROUTE}
        element={isAuth ? <Navigate to="/" /> : <LogIn />}
      />
      <Route
        path={USER_PROFILE}
        element={getIsAuth ? <UserProfile /> : <Navigate to="/login" />}
      />
      <Route path={PRODUCT_ID_ROUTE} element={<DetailedProductPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
