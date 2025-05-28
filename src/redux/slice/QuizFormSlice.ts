import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuizRequest } from '@/types/request/QuizRequest'

interface QuizFormState {
    form: QuizRequest | null
}

const initialState: QuizFormState = {
    form: null
}

const quizFormSlice = createSlice({
    name: 'quizForm',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<QuizRequest>) => {
            state.form = action.payload
        },
        reset: (state) => {
            state.form = null
        }
    }
})

export const QuizFormActions = quizFormSlice.actions
export const QuizFormReducer = quizFormSlice.reducer
