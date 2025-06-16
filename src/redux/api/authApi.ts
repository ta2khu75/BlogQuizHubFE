import { AccountRequest } from "@/types/request/account/AccountRequest";
import { apiSlice } from "@/redux/apiSlice";
import { AuthRequest } from "@/types/request/AuthRequest";
import { AuthActions } from "@/redux/slice/authSlice";
import { BasePath } from "@/env/BasePath";
import { AccountPasswordRequest } from "@/types/request/account/AccountPasswordRequest";
import { ApiResponse } from "@/types/response/ApiResponse";
import { AuthResponse } from "@/types/response/AuthResponse";
const path = BasePath.auth
export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ApiResponse<AuthResponse>, AuthRequest>({
            query: (body) => ({
                url: path.login(),
                method: 'POST',
                body,
            }),
            async onQueryStarted(queryArgument, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(AuthActions.set(data.data))
                } catch (error) {
                    console.log(error);
                    dispatch(AuthActions.reset());
                }
            },
        }),
        register: builder.mutation<ApiResponse<void>, AccountRequest>({
            query: (body) => ({
                url: path.register(),
                method: 'POST',
                body
            })
        }),
        logout: builder.mutation<ApiResponse<void>, void>({
            query: () => ({
                url: path.logout(),
                method: 'POST',
            })
        }),
        changePassword: builder.mutation<ApiResponse<void>, AccountPasswordRequest>({
            query: (body) => ({
                url: path.changePassword(),
                method: 'PUT',
                body
            })
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useChangePasswordMutation } = authApi;