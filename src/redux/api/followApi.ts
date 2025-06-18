import { apiSlice } from "@/redux/apiSlice";
import { BasePath } from "@/env/BasePath";
import { BaseTag } from "@/env/BaseTag";
import { ApiResponse } from "@/types/response/ApiResponse";
import { FollowResponse } from "@/types/response/FollowResponse";
const path = BasePath.follows
const tag = BaseTag.FOLLOW
export const followApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        follow: builder.mutation<ApiResponse<FollowResponse>, number>({
            query: (profileId) => ({
                url: path.byId(profileId),
                method: 'POST',
            }),
            invalidatesTags: (result, error, id) => error ? [] : [{ type: tag, id }]
        }),
        readFollow: builder.query<ApiResponse<FollowResponse>, number>({
            query: (id) => path.byId(id),
            providesTags: (result, error, id) => error ? [] : [{ type: tag, id }]
        }),
        unFollow: builder.mutation<ApiResponse<void>, number>({
            query: (id) => ({
                url: path.byId(id),
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: tag, id }]
        })
    }),
});
const { useFollowMutation, useReadFollowQuery, useUnFollowMutation } = followApi
export const followHooks = {
    useFollowMutation, useReadFollowQuery, useUnFollowMutation
};
