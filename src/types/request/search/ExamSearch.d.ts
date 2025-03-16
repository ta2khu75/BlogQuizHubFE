import { ExamLevel } from "../../ExamLevel";

interface ExamSearch extends Search {
    examLevels?: ExamLevel[],
    examCategoryIds?: number[],
    minDuration?: number,
    maxDuration?: number,
    // authorId: string
}