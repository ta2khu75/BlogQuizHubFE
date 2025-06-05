import { AccountRequest } from "@/types/request/account/AccountRequest";
import { apiSlice } from "@/redux/apiSlice";
import { AuthRequest } from "@/types/request/AuthRequest";
import { AuthActions } from "@/redux/slice/authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ApiResponse<AuthResponse>, AuthRequest>({
            query: (body) => ({
                url: '/auth/login',
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
                url: '/auth/register',
                method: 'POST',
                body
            })
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;