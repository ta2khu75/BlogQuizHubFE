import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse";
import { AccountStatusResponse } from "@/types/response/Account/AccountStatusResponse";
import { BaseResponse } from "@/types/response/BaseResponse";

export interface AccountResponse extends BaseResponse<string> {
    status: AccountStatusResponse;
    profile: AccountProfileResponse;
    createdBy: string;
}
