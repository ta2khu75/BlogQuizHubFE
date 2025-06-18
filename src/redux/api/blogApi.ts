import { apiSlice } from "@/redux/apiSlice";
import { Search } from "@/types/request/search/Search";
import { BasePath } from "@/env/BasePath";
import { BaseTag } from "@/env/BaseTag";
import { BlogResponse } from "@/types/response/BlogResponse";
import { BlogRequest } from "@/types/request/BlogRequest";
import { ApiResponse } from "@/types/response/ApiResponse";
import { PageResponse } from "@/types/response/PageResponse";
import { BlogSearch } from "@/types/request/search/BlogSearch";
import { BaseId } from "@/env/BaseId";
import { CommentResponse } from "@/types/response/CommentResponse";
import { CommentRequest } from "@/types/request/CommentRequest";
const path = BasePath.blogs;
const tag = BaseTag.BLOG
const commentTag = BaseTag.COMMENT
const defaultId = BaseId.PAGE
const defaultTag = [{ type: tag, id: defaultId }]
export const blogApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchBlog: builder.query<ApiResponse<PageResponse<BlogResponse>>, BlogSearch>({
            query: (params) => ({ url: path.root(), params }),
            providesTags: (result) => {
                if (result) {
                    const content = result?.data?.content ?? []
                    const final = [...content.map(({ id }) => ({ type: tag, id })), ...defaultTag];
                    return final
                }
                return defaultTag
            }
        }),
        readBlog: builder.query<ApiResponse<BlogResponse>, string>({
            query: (id) => path.byId(id),
            providesTags: (result, error, arg) => [{ type: tag, id: arg }]
        }),
        createBlog: builder.mutation<ApiResponse<BlogResponse>, BlogRequest>({
            query: (data) => ({
                url: path.root(),
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error) => error ? [] : defaultTag,
        }),
        updateBlog: builder.mutation<ApiResponse<BlogResponse>, { id: number, body: BlogRequest }>({
            query: (data) => ({
                url: path.byId(data.id),
                method: 'PUT',
                body: data.body,
            }),
            invalidatesTags: (result, error, data) => error ? [] : [{ type: tag, id: data.id }]
        }),
        deleteBlog: builder.mutation<ApiResponse<void>, number>({
            query: (id) => ({
                url: path.byId(id),
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => error ? [] : [{ type: tag, id }]
        }),
        readBlogComment: builder.query<ApiResponse<PageResponse<CommentResponse>>, { id: string, search?: Search }>({
            query: (arg) => path.comments(arg.id),
            providesTags: (result, error, arg) => {
                if (result) {
                    const content = result?.data?.content ?? []
                    const final = [...content.map(({ id }) => ({ type: commentTag, id })), ...
                        [{ type: commentTag, id: `blog-${arg.id}` }]
                    ];
                    return final
                }
                return [{ type: commentTag, id: `blog-${arg.id}` }]
            }
        }),
        createBlogComment: builder.mutation<ApiResponse<PageResponse<CommentResponse>>, { id: string, body: CommentRequest }>({
            query: (arg) => path.comments(arg.id),
            invalidatesTags: (result, error, arg) => [{ type: commentTag, id: `blog-${arg.id}` }]
        })
    }),
});
const { useCreateBlogMutation, useReadBlogCommentQuery, useDeleteBlogMutation, useCreateBlogCommentMutation, useReadBlogQuery, useUpdateBlogMutation, useSearchBlogQuery } = blogApi;
export const blogHooks = {
    useSearchBlogQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useReadBlogCommentQuery,
    useReadBlogQuery,
    useCreateBlogCommentMutation,
};