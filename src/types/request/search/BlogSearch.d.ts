interface BlogSearchRequest extends Search {
    blogTagNames?: string[],
    minView?: number,
    maxView?: number,
    // authorId: string
}