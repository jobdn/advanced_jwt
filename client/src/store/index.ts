import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user.slice";
import allUsersReducer from "./slices/all-users.slide";

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
