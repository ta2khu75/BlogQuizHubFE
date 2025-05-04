
import { BasePath } from "@/env/BasePath";
import { AuthRequest } from "@/types/request/AuthRequest";
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
  static changePassword(account: AccountPasswordRequest): Promise<ApiResponse<AccountResponse>> {
    return api.put(`${basePath}/change-password`, account);
  }
  static refreshToken(): Promise<ApiResponse<AuthResponse>> {
    return axios.post(`${basePath}/refresh-token`, null, { withCredentials: true });
  }
  static logout(): Promise<ApiResponse<void>> {
    return api.post(`${basePath}/logout`);
  }
  static checkAdmin(): Promise<ApiResponse<BooleanResponse>> {
    return api.get(`${basePath}/check-admin`);
  }
}
