interface ExamResultResponse {
    point: number;
    correct_count: number;
    exam: ExamResponse;
    account: AccountResponse;
    end_time: string;
    info: InfoResponse;
    user_answers?: UserAnswerResponse[]
}
