import backend from "../http";

import { AxiosResponse } from "axios";
import { UsersResponse } from "models/response/UserResponse";

export class UserService {
  static async getUsers(): Promise<AxiosResponse<UsersResponse>> {
    return await backend.get<UsersResponse>("/users");
  }
}
