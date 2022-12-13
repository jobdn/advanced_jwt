import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAuth } from "hooks";
import { logoutThunk } from "store/thunks/logout.thunk";

export const HomePage = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(logoutThunk())
      .then(() => navigate("/login"))
      .catch((error) => {
        // Do something. Show popup with error message for example
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Home</h1>
      <Link to="/users">Show all users</Link>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
