interface ExamResultSearch extends Search {
    fromDate?: Date,
    toDate?: Date,
    examCategoryIds?: number[],
}