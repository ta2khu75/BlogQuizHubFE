import { CommentBase } from "@/types/base/CommentBase";
import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse";
import { BaseResponse } from "@/types/response/BaseResponse";

export interface CommentResponse extends CommentBase, BaseResponse<string> {
    author: AccountProfileResponse;
}