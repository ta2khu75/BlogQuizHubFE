import { QuizBase } from "@/types/base/QuizBase"
import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse"

export interface QuizResponse extends QuizBase, BaseResponse<string> {
    image_path: string,
    author: AccountProfileResponse
    category: QuizCategoryResponse
    blog?: BlogResponse,
    questions: QuestionResponse[]
}