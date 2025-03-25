interface BlogRequest extends BlogBase {
    content: string;
    quiz_ids?: string[];
}