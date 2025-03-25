import { ExamLevel } from "../../QuizLevel";

interface QuizSearch extends Search {
    examLevels?: ExamLevel[],
    examCategoryIds?: number[],
    minDuration?: number,
    maxDuration?: number,
    // authorId: string
}