import { BasePath } from '@/env/BasePath';
import { AuthActions } from '@/redux/slice/authSlice';
import { RootState } from '@/redux/store';
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: BasePath.BASE_URL,
    credentials: 'include', // nếu dùng cookie
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth?.access_token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.data) {
        console.log('API success:', result.data);
    } else if (result.error) {
        console.error('API error:', result.error);
        const status = result.error?.status;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wwwAuth = (result.error as any)?.response?.headers?.['www-authenticate'];
        // Debug xem có gì trong header
        if (status === 401 && wwwAuth?.includes('Bearer')) {
            const match = /error="(.+?)",\s*error_description="(.+?)"/.exec(wwwAuth);
            const errorCode = match?.[1]; // ví dụ: "invalid_token"
            const errorMessage = match?.[2]; // ví dụ: "Token expired"

            console.warn('Token error:', errorCode, '-', errorMessage);

            if (errorCode === 'invalid_token' || errorMessage?.includes('expired')) {
                const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
                if ('data' in refreshResult) {
                    api.dispatch(AuthActions.set(refreshResult.data));
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(AuthActions.reset());
                }
            }
        }
    }
    return result;
};
