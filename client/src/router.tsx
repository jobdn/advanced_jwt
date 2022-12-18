import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import { UsersPage } from "pages/users";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";

import { Layout } from "components/Layout";

import { useAppDispatch, useAppSelector } from "hooks";
import { checkAuthThunk } from "store/thunks/checkAuth.thunk";
import { AvailableToken } from "models/http";

export const RequireAuth: React.FC = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export const Router = () => {
  const dispatch = useAppDispatch();
  const firstRenderRef = React.useRef(true);

  React.useLayoutEffect(() => {
    function checkAuthOnFirstRender() {
      if (localStorage.getItem(AvailableToken.ACCESS)) {
        dispatch(checkAuthThunk());
      }
    }

    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    }

    checkAuthOnFirstRender();
  }, []);

  const loading = useAppSelector((state) => state.user.loading);

  if (loading || firstRenderRef.current) {
    return <h1>Loading...</h1>;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<RequireAuth />}>
          {/* protected routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>

      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<h1>Empty page 💥</h1>} />
    </Routes>
  );
};
