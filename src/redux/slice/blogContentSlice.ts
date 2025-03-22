import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Descendant } from "slate";
const initialState: { content: Descendant[] } = {
    content: [{ type: 'paragraph', children: [{ text: '' }] }],
}
// luu danh sach image blog
export const blogContentSlice = createSlice({
    name: "blogContent",
    initialState,
    reducers: {
        set: (
            state = initialState,
            action: PayloadAction<Descendant[]>
        ) => {
            state.content = action.payload;
        },
        setString: (
            state = initialState,
            action: PayloadAction<string>) => {
            const data = JSON.parse(action.payload);
            state.content = data;
        },
        reset: () => {
            return initialState;
        },
    },
});
export const BlogContentActions = blogContentSlice.actions;
export const BlogContentReducer = blogContentSlice.reducer;