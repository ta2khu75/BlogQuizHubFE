import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BlogRequest } from '@/types/request/BlogRequest'

interface BlogFormState {
    form: BlogRequest | null
}

const initialState: BlogFormState = {
    form: null
}

const blogFormSlice = createSlice({
    name: 'blogForm',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<BlogRequest>) => {
            state.form = action.payload
        },
        reset: (state) => {
            state.form = null
        }
    }
})

export const BlogFormActions = blogFormSlice.actions
export const BlogFormReducer = blogFormSlice.reducer
