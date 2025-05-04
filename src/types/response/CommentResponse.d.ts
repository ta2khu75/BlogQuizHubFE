
interface CommentResponse extends CommentBase, BaseResponse<string> {
    author: AccountProfileResponse;
}