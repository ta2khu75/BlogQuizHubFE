import { apiSlice } from "@/redux/apiSlice";
import { BasePath } from "@/env/BasePath";
import { ApiResponse } from "@/types/response/ApiResponse";
import { PermissionGroupResponse } from "@/types/response/PermissionGroupResponse";
const path = BasePath.permissionsGroups;
// const tag = BaseTag.PERMISSION_GROUP
// const defaultId = "LIST"
export const permissionGroupApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readAllPermissionGroup: builder.query<ApiResponse<PermissionGroupResponse[]>, void>({
            query: () => path.root(),
        }),
    }),
});
const { useReadAllPermissionGroupQuery } = permissionGroupApi;
export const permissionGroupHooks = { useReadAllPermissionGroupQuery };