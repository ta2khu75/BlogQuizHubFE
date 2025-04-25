interface QuizResponse extends QuizBase {
    image_path: string,
    author: AccountProfileResponse
    category: QuizCategoryResponse
    info: InfoResponse<string>,
    blog?: BlogResponse,
    questions: QuestionResponse[]
}