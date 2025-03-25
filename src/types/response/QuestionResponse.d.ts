interface QuestionResponse extends QuestionBase {
    id: number;
    file_path?: string;
    answers: AnswerResponse[]
}
