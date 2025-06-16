import { Search } from "@/types/request/search/Search";

export interface BlogSearch extends Search {
    blogTagNames?: string[],
    minView?: number,
    maxView?: number,
}