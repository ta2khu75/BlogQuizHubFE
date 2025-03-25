import { AccessModifier } from "@/types/AccessModifier";
import { QuestionType } from "@/types/QuestionType";
import { QuizLevel } from "@/types/QuizLevel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: QuizRequest = {
    title: "",
    description: "",
    duration: 0,
    questions: [{ question: "", question_type: QuestionType.SINGLE_CHOICE, answers: Array(4).fill({ answer: "", correct: false }) }],
    quiz_level: QuizLevel.EASY,
    quiz_category_id: 0,
    isCompleted: false,
    isShuffle: true,
    showAnswer: true,
    showResult: true,
    access_modifier: AccessModifier.PRIVATE
}
// luu danh sach quiz
export const QuizSlice = createSlice({
    name: "exam",
    initialState,
    reducers: {
        set: (state,
            action: PayloadAction<QuizRequest>
        ) => {
            Object.assign(state, action.payload);
        },
        reset: () => {
            return initialState;
        },
    },
});
export const QuizActions = QuizSlice.actions;
export const QuizReducer = QuizSlice.reducer;
