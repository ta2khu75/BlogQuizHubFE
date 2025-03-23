import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface QuizState {
    value: QuizRequest[]
}
const initialState: QuizState = {
    value: []
}
// luu quizzes trong truong hop tao quiz
export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        set: (
            state = initialState,
            action: PayloadAction<QuizRequest[]>
        ) => {
            state.value = action.payload
        },
        remove: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1);
        },
        add: (state, action: PayloadAction<QuizRequest>) => {
            state.value.push(action.payload);
        },
        update: (state, action: PayloadAction<{ indexQuiz: number, quiz: QuizRequest }>) => {
            const { indexQuiz, quiz } = action.payload;
            state.value[indexQuiz] = quiz
        },
        resetQuiz: () => {
            return initialState;
        },
    },
});
export const QuizActions = quizSlice.actions;
export const QuizReducer = quizSlice.reducer;