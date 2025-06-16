import { Search } from "@/types/request/search/Search";

export interface QuizResultSearch extends Search {
    fromDate?: string,
    toDate?: string,
    quizCategoryIds?: number[],
}