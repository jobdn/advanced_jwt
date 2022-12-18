import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "hooks";

export const HomePage = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  React.useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <Link to="/users">Show all users</Link>
    </div>
  );
};
