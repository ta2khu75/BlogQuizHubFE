import { UserAnswerRequest } from "@/types/request/UserAnswerRequest";

export interface QuizResultRequest {
    user_answers: UserAnswerRequest[]
}