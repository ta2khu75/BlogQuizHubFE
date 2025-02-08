import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: AuthResponse = {
  authenticated: false,
};
export const authSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set: (
      state = initialState,
      action: PayloadAction<AuthResponse>
    ) => {
      localStorage.setItem("auth", JSON.stringify(action.payload));
      state.access_token = action.payload.access_token;
      state.account = action.payload.account;
      state.authenticated = action.payload.authenticated;
      state.refresh_token = action.payload.refresh_token;
    },
    init: (state) => {
      const authJson = localStorage.getItem("auth");
      if (authJson) {
        const auth = JSON.parse(authJson);
        state.access_token = auth.access_token;
        state.account = auth.account;
        state.authenticated = auth.authenticated;
        state.refresh_token = auth.refresh_token;
      }
    },
    reset: (state) => {
      state.access_token = initialState.access_token;
      state.account = initialState.account;
      state.authenticated = initialState.authenticated;
      state.refresh_token = initialState.refresh_token;
      localStorage.removeItem("auth");
    },
  },
});
export const AuthActions = authSlide.actions;
export const AuthReducer = authSlide.reducer
