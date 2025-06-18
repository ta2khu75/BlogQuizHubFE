import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse";
import { createSlice } from "@reduxjs/toolkit";
type AuthState = {
  access_token?: string;
  profile?: AccountProfileResponse;
  role?: string
}
const initialState: AuthState = {}
export const authSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set: (_, action) => {
      return action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    reset: (state) => {
      state.access_token = undefined;
      state.profile = undefined;
      state.role = undefined;
    },
    resetToken: (state) => {
      state.access_token = undefined
    }
  },
});
export const AuthActions = { ...authSlide.actions };
export const AuthReducer = authSlide.reducer
