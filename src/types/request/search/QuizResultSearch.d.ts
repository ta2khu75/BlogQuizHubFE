interface QuizResultSearch extends Search {
    fromDate?: string,
    toDate?: string,
    quizCategoryIds?: number[],
}