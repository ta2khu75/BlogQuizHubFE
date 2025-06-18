
import { apiSlice } from "@/redux/apiSlice";
import { BasePath } from "@/env/BasePath";
import { BaseTag } from "@/env/BaseTag";
import { ApiResponse } from "@/types/response/ApiResponse";
import { CommentRequest } from "@/types/request/CommentRequest";
import { CommentResponse } from "@/types/response/CommentResponse";
const path = BasePath.comments
const tag = BaseTag.COMMENT
export const commentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateComment: builder.mutation<ApiResponse<CommentResponse>, { id: string, body: CommentRequest }>({
            query: (data) => ({
                url: path.byId(data.id),
                method: 'PUT',
                body: data.body
            }),
            invalidatesTags: (result, error, data) => [{ type: tag, id: data.id }]
        }),
        deleteComment: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: path.byId(id),
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: tag, id }]
        })
    }),
});
const { useDeleteCommentMutation, useUpdateCommentMutation
} = commentApi
export const commentHooks = {
    useUpdateCommentMutation,
    useDeleteCommentMutation,
};
