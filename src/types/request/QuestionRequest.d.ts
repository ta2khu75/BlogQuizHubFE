interface QuestionRequest extends QuestionBase {
    id?: number;
    answers: AnswerRequest[];
}