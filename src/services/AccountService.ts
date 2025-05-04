import { BasePath } from "@/env/BasePath";
import instance from "@/util/AxiosApi";

const basePath = BasePath.ACCOUNT;
export default class AccountService {
  static readPage(search = "", page = 1, size = 10): Promise<ApiResponse<PageResponse<AccountResponse>>> {
    return instance.get(`${basePath}`, { params: { search, page, size } });
  }
  static create(account: AccountRequest): Promise<ApiResponse<AccountResponse>> {
    return instance.post(basePath, account);
  }
  static updateStatus(id: string, account: AccountStatusRequest): Promise<ApiResponse<AccountResponse>> {
    return instance.put(`${basePath}/${id}`, account);
  }
  static updateInfo(account: AccountProfileRequest): Promise<ApiResponse<AccountProfileResponse>> {
    return instance.put(`${basePath}`, account);
  }
  static updatePermission(id: string, permissionIds: number[]): Promise<ApiResponse<AccountResponse>> {
    return instance.put(`${basePath}/${id}/permission`, { permission_ids: permissionIds });
  }
  static readById(id: string): Promise<ApiResponse<AccountProfileResponse>> {
    return instance.get(`${basePath}/${id}`);
  }
  static readDetailsById(id: string): Promise<ApiResponse<AccountProfileResponse>> {
    return instance.get(`${basePath}/${id}/details`);
  }
}
