import { apiSlice } from "@/redux/apiSlice";
import { BasePath } from "@/env/BasePath";
import { QuizCategoryRequest } from "@/types/request/QuizCategoryRequest";
import { BaseTag } from "@/env/BaseTag";
import { ApiResponse } from "@/types/response/ApiResponse";
import { QuizCategoryResponse } from "@/types/response/QuizCategoryResponse";
import { BaseId } from "@/env/BaseId";
const path = BasePath.quizCategories;
const tag = BaseTag.QUIZ_CATEGORY
const defaultId = BaseId.LIST
const defaultTag = [{ type: tag, id: defaultId }];
export const quizCategoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readAllQuizCategory: builder.query<ApiResponse<QuizCategoryResponse[]>, void>({
            query: () => path.root(),
            providesTags: (result) => {
                if (result) {
                    return [...result.data.map(({ id }) => ({ type: tag, id })), ...defaultTag];
                }
                return defaultTag
            }
        }),
        createQuizCategory: builder.mutation<ApiResponse<QuizCategoryResponse>, QuizCategoryRequest>({
            query: (data) => ({
                url: path.root(),
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error) => error ? [] : defaultTag
        }),
        updateQuizCategory: builder.mutation<ApiResponse<QuizCategoryResponse>, { id: number, body: QuizCategoryRequest }>({
            query: (data) => ({
                url: path.byId(data.id),
                method: 'PUT',
                body: data.body,
            }),
            invalidatesTags: (result, error, arg) => error ? [] : [{ type: tag, id: arg.id }]
        }),
        deleteQuizCategory: builder.mutation<ApiResponse<void>, number>({
            query: (id) => ({
                url: path.byId(id),
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => error ? [] : [{ type: tag, id }]
        })
    }),
});
const { useCreateQuizCategoryMutation, useDeleteQuizCategoryMutation, useReadAllQuizCategoryQuery, useUpdateQuizCategoryMutation } = quizCategoryApi;
export const quizCategoryHooks = {
    useCreateQuizCategoryMutation,
    useReadAllQuizCategoryQuery,
    useUpdateQuizCategoryMutation,
    useDeleteQuizCategoryMutation
};