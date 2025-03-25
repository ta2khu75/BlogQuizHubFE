interface QuizResultResponse {
    point: number;
    correct_count: number;
    quiz: QuizResponse;
    account: AccountResponse;
    end_time: string;
    info: InfoResponse;
    user_answers?: UserAnswerResponse[]
}
