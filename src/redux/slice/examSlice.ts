import { AccessModifier } from "@/types/AccessModifier";
import { ExamLevel } from "@/types/ExamLevel";
import { ExamStatus } from "@/types/ExamStatus";
import { QuizType } from "@/types/QuizType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: ExamRequest = {
    title: "",
    description: "",
    duration: 0,
    quizzes: [{ question: "", quiz_type: QuizType.SINGLE_CHOICE, answers: Array(4).fill({ answer: "", correct: false }) }],
    exam_level: ExamLevel.EASY,
    exam_category_id: 0,
    exam_status: ExamStatus.NOT_COMPLETED,
    access_modifier: AccessModifier.PRIVATE
}
// luu danh sach quiz
export const ExamSlice = createSlice({
    name: "exam",
    initialState,
    reducers: {
        set: (state,
            action: PayloadAction<ExamRequest>
        ) => {
            Object.assign(state, action.payload);
        },
        reset: () => {
            return initialState;
        },
    },
});
export const ExamActions = ExamSlice.actions;
export const ExamReducer = ExamSlice.reducer;
