export default interface UserAnswerResponse {
    id: number;
    correct: boolean;
    question: QuestionResponse;
    answers: AnswerResponse[]
}