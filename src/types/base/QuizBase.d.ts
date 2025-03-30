
interface QuizBase {
    title: string;
    duration: number;
    description: string;
    quiz_level: QuizLevel;
    access_modifier: AccessModifier;
    quiz_result_mode: QuizResultMode;
    shuffle_question: boolean;
    completed: boolean;
}