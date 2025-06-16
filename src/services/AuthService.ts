import { BasePath } from "@/env/BasePath";
import { AccountPasswordRequest } from "@/types/request/account/AccountPasswordRequest";
import { AccountProfileRequest } from "@/types/request/account/AccountProfileRequest";
import { AccountRequest } from "@/types/request/account/AccountRequest";
import { AuthRequest } from "@/types/request/AuthRequest";
import { AccountResponse } from "@/types/response/Account/AccountResponse";
import api from "@/util/AxiosApi";
import axios from "axios";
const basePath = BasePath.AUTH
export default class AuthService {
  static login(authRequest: AuthRequest): Promise<ApiResponse<AuthResponse>> {
    return api.post(`${basePath}/login`, authRequest);
  }
  static register(account: AccountRequest): Promise<ApiResponse<AccountResponse>> {
    return api.post(`${basePath}/register`, account);
  }
  static changePassword(password: AccountPasswordRequest): Promise<ApiResponse<AccountResponse>> {
    return api.put(`${basePath}/change-password`, password);
  }
  static changeProfile(profile: AccountProfileRequest): Promise<ApiResponse<AccountResponse>> {
    return api.put(`${basePath}/change-profile`, profile);
  }
  static refreshToken(): Promise<ApiResponse<AuthResponse>> {
    return axios.post(`${basePath}/refresh-token`, null, { withCredentials: true });
  }
  static logout(): Promise<ApiResponse<void>> {
    return api.post(`${basePath}/logout`);
  }
}
