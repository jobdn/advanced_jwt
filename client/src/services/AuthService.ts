import { AxiosResponse } from "axios";

import backend from "../http";
import { AuthResponse } from "../models/response/AuthResponse";

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return await backend.post<AuthResponse>("/auth/login", { email, password });
  }

  static async register(
    name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return await backend.post<AuthResponse>("/auth/registration", {
      name,
      email,
      password,
    });
  }

  static async logout() {
    return await backend.post("/auth/logout");
  }
}
