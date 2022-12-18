import React from "react";

import { useAppDispatch, useAppSelector } from "hooks";

import { usersThunk } from "store/thunks/users.thunk";

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.allUsers);

  React.useEffect(() => {
    dispatch(usersThunk());
  }, []);

  return (
    <div className="page page_center">
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};
