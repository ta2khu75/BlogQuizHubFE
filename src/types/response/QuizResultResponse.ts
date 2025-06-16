import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse";
import { BaseResponse } from "@/types/response/BaseResponse";
import { QuizResponse } from "@/types/response/QuizResponse";
import UserAnswerResponse from "@/types/response/UserAnswerResponse";

export interface QuizResultResponse extends BaseResponse<string> {
    point: number;
    correct_count: number;
    quiz: QuizResponse;
    account: AccountProfileResponse;
    end_time: string;
    user_answers?: UserAnswerResponse[]
}
