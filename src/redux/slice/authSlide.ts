import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: AuthResponse = {};
export const authSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set: (
      _,
      action: PayloadAction<AuthResponse>
    ) => {
      return action.payload
    },
    setProfile: (state, action: PayloadAction<AccountProfileResponse>) => {
      state.profile = action.payload;
    },
    reset: () => initialState,
  },
});
export const AuthActions = authSlide.actions;
export const AuthReducer = authSlide.reducer
