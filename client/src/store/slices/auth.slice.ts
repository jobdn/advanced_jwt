import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AvailableToken } from "models/http";
import { User } from "models/User";

import { checkAuthThunk } from "../thunks/checkAuth.thunk";
import { logoutThunk } from "../thunks/logout.thunk";
import { loginThunk } from "../thunks/login.thunk";
import { registerThunk } from "../thunks/register.thunk";

interface AuthState {
  user: User;
  isAuth: boolean;
  error: boolean;
  loading: boolean;
}

const userIsAuth = localStorage.getItem(AvailableToken.ACCESS) ? true : false;

const initialState: AuthState = {
  user: {} as User,
  isAuth: userIsAuth,
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },

  extraReducers: (builder) => {
    // login
    builder.addCase(loginThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
        state.loading = false;
        state.isAuth = true;
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
      state.isAuth = false;
    });

    // register
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      registerThunk.fulfilled,
      (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      }
    );
    builder.addCase(registerThunk.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    // refresh
    builder.addCase(checkAuthThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      checkAuthThunk.fulfilled,
      (state, action: PayloadAction<User>) => {
        console.log("full!", action.payload);

        state.isAuth = true;
        state.loading = false;
        state.user = action.payload;
      }
    );

    builder.addCase(checkAuthThunk.rejected, (state, action) => {
      console.log("rej");
      state.isAuth = false;
      state.loading = false;
    });
  },
});
export const userSliceActions = authSlice.actions;
export const userReducer = authSlice.reducer;
