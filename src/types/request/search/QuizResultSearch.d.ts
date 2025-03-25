interface QuizResultSearch extends Search {
    fromDate?: Date,
    toDate?: Date,
    examCategoryIds?: number[],
}