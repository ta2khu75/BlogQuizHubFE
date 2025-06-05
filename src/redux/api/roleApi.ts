import { AccountRequest } from "@/types/request/account/AccountRequest";
import { AccountResponse } from "@/types/response/Account/AccountResponse";
import { apiSlice } from "@/redux/apiSlice";
import { BasePath } from "@/env/BasePath";
import { AccountStatusRequest } from "@/types/request/account/AccountStatusRequest";

export const accountApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        search: builder.query<ApiResponse<PageResponse<AccountResponse>>, AccountSearch>({
            query: () => `/${BasePath.ACCOUNT}`,
            providesTags: (result) => {
                if (result) {
                    const final = [...result.data.content.map(({ id }) => ({ type: "Accounts" as const, id })), { type: 'Accounts' as const, id: 'PAGE' }];
                    return final
                }
                const final = [{ type: 'Accounts' as const, id: 'PAGE' }]
                return final;
            }
        }),
        create: builder.mutation<ApiResponse<AccountResponse>, Partial<AccountRequest>>({
            query: (data) => ({
                url: `/${BasePath.ACCOUNT}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: () => [{ type: "Accounts" as const, id: 'PAGE' }]
        }),
        updateStatus: builder.mutation<ApiResponse<AccountResponse>, { id: string, body: AccountStatusRequest }>({
            query: (data) => ({
                url: `/${BasePath.ACCOUNT}/status/${data.id}`,
                method: 'PUT',
                body: data.body,
            }),
            invalidatesTags: (result, error, data) => [{ type: "Accounts" as const, id: data.id }]
        }),
    }),
});
const { useCreateMutation, useSearchQuery, useUpdateStatusMutation } = accountApi
export const accountHooks = {
    useCreateMutation,
    useSearchQuery,
    useUpdateStatusMutation
};
