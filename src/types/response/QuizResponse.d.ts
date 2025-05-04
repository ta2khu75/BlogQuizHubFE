interface QuizResponse extends QuizBase, BaseResponse<string> {
    image_path: string,
    author: AccountProfileResponse
    category: QuizCategoryResponse
    blog?: BlogResponse,
    questions: QuestionResponse[]
}