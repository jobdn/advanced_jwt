import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { usersThunk } from "store/thunks/users.thunk";

import { User } from "models/User";

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: { users: [] as User[] },
  reducers: {},
  extraReducers: (builder) => {
    // TODO: make reducers for pending and rejected
    builder.addCase(
      usersThunk.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      }
    );
  },
});

export const allUsersReducer = allUsersSlice.reducer;
