interface QuizResultResponse {
    point: number;
    correct_count: number;
    quiz: QuizResponse;
    account: AccountProfileResponse;
    end_time: string;
    info: InfoResponse<string>;
    user_answers?: UserAnswerResponse[]
}
