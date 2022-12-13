import { registerThunk } from "../thunks/register.thunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { logoutThunk } from "../thunks/logout.thunk";
import { loginThunk } from "../thunks/login.thunk";

import { User } from "models/User";

interface UserState {
  user: User;
  error: boolean;
  loading: boolean;
}

const initialState: UserState = {
  user: {} as User,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    // login
    builder.addCase(loginThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload.user;
      }
    );
    builder.addCase(loginThunk.rejected, (state, action) => {
      console.log("FUCKING ERROR slice: ", action);
      state.error = true;
      state.loading = false;
    });

    // logout
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = {} as User;
    });

    // register
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      registerThunk.fulfilled,
      (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
        // А вот обязательно изменять все поля слайса?
        state.loading = false;
        state.error = false;
        state.user = action.payload.user;
      }
    );
    builder.addCase(registerThunk.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default userSlice.reducer;
