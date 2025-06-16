import { AccountResponse } from "@/types/response/Account/AccountResponse";
import { apiSlice } from "@/redux/apiSlice";
import { BasePath } from "@/env/BasePath";
import { BaseTag } from "@/env/BaseTag";
import { ApiResponse } from "@/types/response/ApiResponse";
import { RoleRequest } from "@/types/request/RoleRequest";
import { BaseId } from "@/env/BaseId";
const path = BasePath.roles
const tag = BaseTag.ROLE
const defaultId = BaseId.LIST
const defaultTag = [{ type: tag, id: defaultId }]
export const roleApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readAllRole: builder.query<ApiResponse<RoleResponse[]>, void>({
            query: () => path.root(),
            providesTags: (result) => {
                if (result) return [...result.data.map(({ id }) => ({ type: tag, id })), ...defaultTag];
                return defaultTag;
            }
        }),
        createRole: builder.mutation<ApiResponse<AccountResponse>, RoleRequest>({
            query: (data) => ({
                url: path.root(),
                method: 'POST',
                body: { ...data, permission_ids: Array.from(data.permission_ids) },
            }),
            invalidatesTags: () => defaultTag
        }),
        updateRole: builder.mutation<ApiResponse<AccountResponse>, { id: number, body: RoleRequest }>({
            query: (data) => ({
                url: path.byId(data.id),
                method: 'PUT',
                body: { ...data.body, permission_ids: Array.from(data.body.permission_ids) },
            }),
            invalidatesTags: (result, error, data) => [{ type: tag, id: data.id }]
        }),
        deleteRole: builder.mutation<ApiResponse<void>, number>({
            query: (id) => ({
                url: path.byId(id),
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: tag, id }]
        })
    }),
});
const { useCreateRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation, useReadAllRoleQuery
} = roleApi
export const roleHooks = {
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
    useReadAllRoleQuery
};
