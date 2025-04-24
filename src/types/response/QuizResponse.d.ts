interface QuizResponse extends QuizBase {
    image_path: string,
    author: AccountResponse
    quiz_category: QuizCategoryResponse
    info: InfoResponse<string>,
    blog?: BlogResponse,
    questions: QuestionResponse[]
}