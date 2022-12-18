import { AvailableToken } from "./../../models/http";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { User } from "models/User";

import { AuthService } from "services/AuthService";

export const checkAuthThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: AxiosError }
>("checkAuth", async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.refresh();

    localStorage.setItem(AvailableToken.ACCESS, response.data.accessToken);

    return response.data.user;
  } catch (error) {
    console.error("X_X", error);
    return rejectWithValue(error as AxiosError);
  }
});
