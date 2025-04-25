interface BlogResponse extends BlogBase {
    info: InfoResponse<string>;
    view_count: number;
    comment_count: number;
    image_path: string;
    author: AccountProfileResponse;
    content: string;
    quizzes?: QuizResponse[];
}