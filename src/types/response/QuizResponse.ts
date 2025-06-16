import { QuizBase } from "@/types/base/QuizBase"
import { QuestionDto } from "@/types/dto/QuestionDto"
import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse"
import { BaseResponse } from "@/types/response/BaseResponse"
import { BlogResponse } from "@/types/response/BlogResponse"
import { QuizCategoryResponse } from "@/types/response/QuizCategoryResponse"

export interface QuizResponse extends QuizBase, BaseResponse<string> {
    image_path: string,
    author: AccountProfileResponse
    category: QuizCategoryResponse
    blog?: BlogResponse,
    questions: QuestionDto[]
}