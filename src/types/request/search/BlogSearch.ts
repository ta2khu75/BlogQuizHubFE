import { Search } from "@/types/request/search/Search";

export interface BlogSearch extends Search {
    tagIds?: number[],
    minView?: number,
    maxView?: number,
}