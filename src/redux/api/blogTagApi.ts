import { apiSlice } from "@/redux/apiSlice";
import { BasePath } from "@/env/BasePath";
import { BaseTag } from "@/env/BaseTag";
import { ApiResponse } from "@/types/response/ApiResponse";
import { PageResponse } from "@/types/response/PageResponse";
import { Search } from "@/types/request/search/Search";
import { BaseId } from "@/env/BaseId";
import { BlogTagResponse } from "@/types/response/BlogTagResponse";
const path = BasePath.blogTags
const tag = BaseTag.BLOG_TAG
const defaultId = BaseId.PAGE
const defaultTag = [{ type: tag, id: defaultId }]
export const blogTagApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchBlogTag: builder.query<ApiResponse<PageResponse<BlogTagResponse>>, Search>({
            query: (params) => ({
                url: path.root(),
                params: params
            }),
            providesTags: (result) => {
                if (result) {
                    const content = result?.data?.content ?? []
                    const final = [...content.map(({ id }) => ({ type: tag, id })), ...defaultTag];
                    return final
                } return defaultTag
            }
        }),
        deleteBlogTag: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: path.byId(id),
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: tag, id }]
        })
    }),
});
const {
    useSearchBlogTagQuery, useDeleteBlogTagMutation
} = blogTagApi
export const blogTagHooks = {
    useSearchBlogTagQuery, useDeleteBlogTagMutation
};
