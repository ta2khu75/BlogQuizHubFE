interface QuizBase {
    title: string;
    duration: number;
    description: string;
    quiz_level: QuizLevel;
    access_modifier: AccessModifier;
    show_answer: boolean;
    show_result: boolean;
    shuffle_question: boolean;
    completed: boolean;
}