
interface QuizSearch extends Search {
    quizLevels?: QuizLevel[],
    quizCategoryIds?: number[],
    minDuration?: number,
    maxDuration?: number,
    quizLevels?: QuizLevel[],
    completed?: boolean,
}