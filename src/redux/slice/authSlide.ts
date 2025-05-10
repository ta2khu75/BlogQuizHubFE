import AuthService from "@/services/AuthService";
import { AuthRequest } from "@/types/request/AuthRequest";
import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
type AuthState = {
  access_token?: string;
  profile?: AccountProfileResponse;
  role?: string
}
const initialState: AuthState = {}
export const authSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      return action.payload;
    }).addCase(fetchRefreshToken.fulfilled, (state, action) => {
      return action.payload
    }).addCase(fetchLogout.fulfilled, () => {
      return initialState
    }).addCase(fetchLogout.rejected, () => {
      return initialState
    })
  }
});
const fetchLogin = createAsyncThunk<AuthResponse, AuthRequest>("auth/login", async (auth: AuthRequest, thunkAPI) => {
  try {
    const response = await AuthService.login(auth)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})
const fetchRefreshToken = createAsyncThunk<AuthResponse, void>("auth/refreshToken", async (_, thunkAPI) => {
  try {
    const response = await AuthService.refreshToken()
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})
const fetchLogout = createAsyncThunk<void, void>("auth/logout", async (_, thunkAPI) => {
  try {
    await AuthService.logout()
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})
export const AuthActions = { ...authSlide.actions, fetchLogin, fetchRefreshToken, fetchLogout };
export const AuthReducer = authSlide.reducer
