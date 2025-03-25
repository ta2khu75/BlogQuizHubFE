interface QuizRequest extends QuizBase {
  quiz_category_id: number;
  questions: QuestionRequest[];
}