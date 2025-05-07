import { BasePath } from "@/env/BasePath";
import { AccountProfileRequest } from "@/types/request/account/AccountProfileRequest";
import { AccountRequest } from "@/types/request/account/AccountRequest";
import { AccountStatusRequest } from "@/types/request/account/AccountStatusRequest";
import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse";
import { AccountResponse } from "@/types/response/Account/AccountResponse";
import { AccountStatusResponse } from "@/types/response/Account/AccountStatusResponse";
import instance from "@/util/AxiosApi";

const basePath = BasePath.ACCOUNT;
export default class AccountService {
  static readPage(search = "", page = 1, size = 10): Promise<ApiResponse<PageResponse<AccountResponse>>> {
    return instance.get(`${basePath}`, { params: { search, page, size } });
  }
  static create(account: AccountRequest): Promise<ApiResponse<AccountResponse>> {
    return instance.post(basePath, account);
  }
  static updateStatus(id: number, account: AccountStatusRequest): Promise<ApiResponse<AccountStatusResponse>> {
    return instance.put(`${basePath}/status/${id}`, account);
  }
  static updateProfile(id: number, account: AccountProfileRequest): Promise<ApiResponse<AccountProfileResponse>> {
    return instance.put(`${basePath}/profile`, account);
  }
  static updatePermission(id: string, permissionIds: number[]): Promise<ApiResponse<AccountResponse>> {
    return instance.put(`${basePath}/${id}/permission`, { permission_ids: permissionIds });
  }
  static readById(id: string): Promise<ApiResponse<AccountProfileResponse>> {
    return instance.get(`${basePath}/${id}`);
  }
  static readProfile(id: number): Promise<ApiResponse<AccountProfileResponse>> {
    return instance.get(`${basePath}/profile/${id}`);
  }
}
