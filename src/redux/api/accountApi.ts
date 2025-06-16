import { AccountRequest } from "@/types/request/account/AccountRequest";
import { AccountResponse } from "@/types/response/Account/AccountResponse";
import { apiSlice } from "@/redux/apiSlice";
import { AccountStatusRequest } from "@/types/request/account/AccountStatusRequest";
import { BasePath } from "@/env/BasePath";
import { AccountProfileRequest } from "@/types/request/account/AccountProfileRequest";
import { BaseTag } from "@/env/BaseTag";
import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse";
import { ApiResponse } from "@/types/response/ApiResponse";
import { PageResponse } from "@/types/response/PageResponse";
import { AccountSearch } from "@/types/request/search/AccountSearch";
import { BaseId } from "@/env/BaseId";
const path = BasePath.accounts;
const tag = BaseTag.ACCOUNT
const defaultId = BaseId.PAGE;
const defaultTag = [{ type: tag, id: defaultId }];
export const accountApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchAccount: builder.query<ApiResponse<PageResponse<AccountResponse>>, AccountSearch>({
            query: (params) => ({ url: path.root(), params }),
            providesTags: (result, error, params) => {
                const nullTags = [{ type: tag, id: `${defaultId}-${JSON.stringify(params)}` }];
                if (!result) {
                    return nullTags
                }
                const tags = result.data.content.map((item) => ({
                    type: tag,
                    id: item.id,
                }));
                return [...tags, ...defaultTag, ...nullTags];
            }
        }),
        readAccountProfile: builder.query<ApiResponse<AccountProfileResponse>, number>({
            query: (id) => ({
                url: path.profile(id),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: tag, id }],
        }),
        createAccount: builder.mutation<ApiResponse<AccountResponse>, Partial<AccountRequest>>({
            query: (data) => ({
                url: path.root(),
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error) => error ? [] : defaultTag
        }),
        updateAccountStatus: builder.mutation<ApiResponse<AccountResponse>, { id: number, body: AccountStatusRequest }>({
            query: (data) => ({
                url: `${path.status(data.id)}`,
                method: 'PUT',
                body: data.body,
            }),
            invalidatesTags: (result, error, data) => error ? [] : [{ type: tag, id: data.id }]
        }),
        updateAccountProfile: builder.mutation<ApiResponse<AccountProfileResponse>, { id: string, body: AccountProfileRequest }>({
            query: (data) => ({
                url: path.profile(data.id),
                method: 'PUT',
                body: data.body,
            }),
            invalidatesTags: (result, error, data) => error ? [] : [{ type: tag, id: data.id }]
        }),
    }),
});
const { useCreateAccountMutation, useSearchAccountQuery, useUpdateAccountStatusMutation, useUpdateAccountProfileMutation, useReadAccountProfileQuery } = accountApi
export const accountHooks = {
    useCreateAccountMutation,
    useReadAccountProfileQuery,
    useUpdateAccountProfileMutation,
    useSearchAccountQuery,
    useUpdateAccountStatusMutation
};
