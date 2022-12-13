import { createBrowserRouter } from "react-router-dom";

import { UsersPage } from "pages/users";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/users", element: <UsersPage /> },
]);

export default router;
