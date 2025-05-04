interface BlogResponse extends BlogBase, BaseResponse<string> {
    view_count: number;
    comment_count: number;
    image_path: string;
    author: AccountProfileResponse;
    content: string;
    quizzes?: QuizResponse[];
}