interface QuizRequest extends QuizBase {
  blog_id?: string
  quiz_category_id: number;
  questions: QuestionRequest[];
}