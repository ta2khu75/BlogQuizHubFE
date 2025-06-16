import { QuizLevel } from "@/types/QuizLevel";
import { Search } from "@/types/request/search/Search";

export interface QuizSearch extends Search {
    quizLevels?: QuizLevel[],
    quizCategoryIds?: number[],
    minDuration?: number,
    maxDuration?: number,
    completed?: boolean,
}