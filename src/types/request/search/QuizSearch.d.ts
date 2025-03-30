import { QuizLevel } from "@/types/QuizLevel";

interface QuizSearch extends Search {
    quizLevels?: QuizLevel[],
    quizCategoryIds?: number[],
    minDuration?: number,
    maxDuration?: number,
    // authorId: string
}