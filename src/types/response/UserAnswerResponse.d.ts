export default interface UserAnswerResponse {
    id: number;
    question: QuestionResponse;
    answers: AnswerResponse[]
}