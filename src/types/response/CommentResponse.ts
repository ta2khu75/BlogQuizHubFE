import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse";
import { BaseResponse } from "@/types/response/BaseResponse";

export interface CommentResponse extends BaseResponse<string> {
    author: AccountProfileResponse;
    content: string
}