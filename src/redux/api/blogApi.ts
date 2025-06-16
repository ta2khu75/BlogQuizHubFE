import { apiSlice } from "@/redux/apiSlice";
import { BasePath } from "@/env/BasePath";
import { BaseTag } from "@/env/BaseTag";
import { BlogResponse } from "@/types/response/BlogResponse";
import { BlogRequest } from "@/types/request/BlogRequest";
import { ApiResponse } from "@/types/response/ApiResponse";
import { PageResponse } from "@/types/response/PageResponse";
import { BlogSearch } from "@/types/request/search/BlogSearch";
import { BaseId } from "@/env/BaseId";
const path = BasePath.blogs;
const tag = BaseTag.BLOG
const defaultId = BaseId.PAGE
const defaultTag = [{ type: tag, id: defaultId }]
export const blogApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchBlog: builder.query<ApiResponse<PageResponse<BlogResponse>>, BlogSearch>({
            query: () => path.root(),
            providesTags: (result) => {
                if (result) {
                    const final = [...result.data.content.map(({ id }) => ({ type: tag, id })), ...defaultTag];
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
        })
    }),
});
const { useCreateBlogMutation, useDeleteBlogMutation, useUpdateBlogMutation, useSearchBlogQuery } = blogApi;
export const blogHooks = {
    useSearchBlogQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation
};