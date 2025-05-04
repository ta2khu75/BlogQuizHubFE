interface QuizRequest extends QuizBase {
  blog_id?: string
  category_id: number;
  questions: QuestionRequest[];
}