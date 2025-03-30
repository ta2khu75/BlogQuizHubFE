
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: string[] = []
export const imageUrlSlice = createSlice({
    name: "imageUrlSlice",
    initialState,
    reducers: {
        add: (
            state = initialState,
            action: PayloadAction<string>
        ) => {
            state.push(action.payload)
        },
        remove: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1)
        },
        reset: () => {
            return initialState
        },
    },
});
export const ImageUrlActions = imageUrlSlice.actions;
export const ImageUrlReducer = imageUrlSlice.reducer
