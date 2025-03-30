interface QuizResultSearch extends Search {
    fromDate?: Date,
    toDate?: Date,
    quizCategoryIds?: number[],
}