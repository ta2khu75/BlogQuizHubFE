import { BlogBase } from "@/types/base/BlogBase";
import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse";
import { BaseResponse } from "@/types/response/BaseResponse";
import { QuizResponse } from "@/types/response/QuizResponse";

export interface BlogResponse extends BlogBase, BaseResponse<string> {
    view_count: number;
    comment_count: number;
    image_path: string;
    author: AccountProfileResponse;
    content: string;
    quizzes?: QuizResponse[];
}