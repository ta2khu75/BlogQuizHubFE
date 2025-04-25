
interface CommentResponse extends CommentBase {
    file_path: string;
    author: AccountProfileResponse;
    info: InfoResponse;
}