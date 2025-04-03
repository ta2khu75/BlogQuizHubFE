
import { RootState } from "@/redux/store";
import FileUtil from "@/util/FileUtil";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: string[] = []
export const imageUrlsSlice = createSlice({
    name: "imagesUrl",
    initialState,
    reducers: {
        add: (
            state = initialState,
            action: PayloadAction<string>
        ) => {
            if (!state.includes(action.payload)) state.push(action.payload)
        },
        remove: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1)
        },
        reset: () => {
            return initialState
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchRemove.fulfilled, (state, action) => {
            imageUrlsSlice.caseReducers.remove(state, action)
        }).addCase(fetchCreate.fulfilled, (state, action) => {
            imageUrlsSlice.caseReducers.add(state, action)
        })
    },
});
const fetchUnsetRemove = createAsyncThunk<void, string[], { state: RootState }>("imageUrl/unsetRemove", async (imageUrlsUse: string[], thunkAPI) => {
    const state = thunkAPI.getState()
    const imageUrls = state.imageUrls;
    const imageIndexRemove = imageUrls.map(imageUrl => !imageUrlsUse.includes(imageUrl))
    try {
        for (let i = 0; i < imageIndexRemove.length; i++) {
            if (imageIndexRemove[i]) {
                await thunkAPI.dispatch(fetchRemove(i))
            }
        }
        thunkAPI.dispatch(imageUrlsSlice.actions.reset())
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue("Failed to delete file");
    }
})
const fetchRemove = createAsyncThunk<number, number, { state: RootState }>("imageUrl/remove", async (index: number, thunkAPI) => {
    const state = thunkAPI.getState()
    try {
        const imageUrl = state.imageUrls[index];
        if (!imageUrl) {
            thunkAPI.rejectWithValue("invalid index")
        }
        await FileUtil.deleteFile(imageUrl);
        return index;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue("Failed to delete file");
    }
})
const fetchCreate = createAsyncThunk<string, File, { state: RootState }>("imageUrl/create", async (file: File, thunkAPI) => {
    try {
        return await FileUtil.uploadFile("blog/images/", file)
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue("Failed to upload file");
    }
})

const fetchReset = createAsyncThunk<void, void, { state: RootState }>("imageUrl/reset", async (_, thunkAPI) => {
    const state = thunkAPI.getState()
    const imageUrls = state.imageUrls
    try {
        await Promise.all(imageUrls.map(async (imageUrl) => await FileUtil.deleteFile(imageUrl)))
        thunkAPI.dispatch(imageUrlsSlice.actions.reset())
    } catch (error) {
        console.log(error);
        thunkAPI.rejectWithValue("Failed to delete file");
    }
})
export const ImageUrlsActions = { ...imageUrlsSlice.actions, fetchCreate, fetchRemove, fetchReset, fetchUnsetRemove };
export const ImageUrlsReducer = imageUrlsSlice.reducer
