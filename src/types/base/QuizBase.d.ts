interface QuizBase {
    title: string;
    duration: number;
    description: string;
    quiz_level: QuizLevel;
    access_modifier: AccessModifier;
    showAnswer: boolean;
    showResult: boolean;
    isShuffle: boolean;
    isCompleted: boolean;
}