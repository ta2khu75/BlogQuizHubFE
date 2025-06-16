import { CommentBase } from "@/types/base/CommentBase";

export interface CommentRequest extends CommentBase {
    blog_id: string;
}