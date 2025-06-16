import { apiSlice } from "@/redux/apiSlice";
import { BasePath } from "@/env/BasePath";
import { BaseTag } from "@/env/BaseTag";
import { QuizResponse } from "@/types/response/QuizResponse";
import { QuizRequest } from "@/types/request/QuizRequest";
import { ApiResponse } from "@/types/response/ApiResponse";
import { PageResponse } from "@/types/response/PageResponse";
import { QuizSearch } from "@/types/request/search/QuizSearch";
import { BaseId } from "@/env/BaseId";
const path = BasePath.quizzes;
const tag = BaseTag.QUIZ
const defaultId = BaseId.PAGE
const defaultTag = [{ type: tag, id: defaultId }]
export const quizApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchQuiz: builder.query<ApiResponse<PageResponse<QuizResponse>>, QuizSearch>({
            query: (params) => ({ url: path.root(), params }),
            providesTags: (result) => {
                const content = result?.data?.content ?? []
                if (result) {
                    const final = [...content?.map(({ id }) => ({ type: tag, id })), ...defaultTag];
                    return final
                }
                return defaultTag
            }
        }),
        searchMineQuizByKeyword: builder.query<ApiResponse<PageResponse<QuizResponse>>, string>({
            query: (keyword) => path.mineByKeyword(keyword),
            providesTags: (result) => {
                if (result) {
                    const final = [...result.data.content.map(({ id }) => ({ type: tag, id })), ...defaultTag];
                    return final
                }
                return defaultTag
            }
        }),
        readQuizDetail: builder.query<ApiResponse<QuizResponse>, string>({
            query: (id) => path.detail(id),
            providesTags: (result, error, arg) => [{ type: tag, id: arg }]
        }),
        readQuiz: builder.query<ApiResponse<QuizResponse>, string>({
            query: (id) => path.byId(id),
            providesTags: (result, error, arg) => [{ type: tag, id: arg }]
        }),
        createQuiz: builder.mutation<ApiResponse<QuizResponse>, { image: File, body: QuizRequest }>({
            query: (data) => {
                const form = new FormData();
                form.append("image", data.image)
                form.append("quiz", JSON.stringify(data.body));
                return {

                    url: path.root(),
                    method: 'POST',
                    body: form,
                }
            },
            invalidatesTags: (result, error) => error ? [] : defaultTag,
        }),
        updateQuiz: builder.mutation<ApiResponse<QuizResponse>, { image?: File, data: { id: string, body: QuizRequest } }>({
            query: (arg) => {
                const form = new FormData();
                if (arg.image)
                    form.append("image", arg.image)
                form.append("quiz", JSON.stringify(arg.data.body));
                return {
                    url: path.byId(arg.data.id),
                    method: 'PUT',
                    body: form
                }
            },
            invalidatesTags: (result, error, arg) => error ? [] : [{ type: tag, id: arg.data.id }]
        }),
        deleteQuiz: builder.mutation<ApiResponse<void>, number>({
            query: (id) => ({
                url: path.byId(id),
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => error ? [] : [{ type: tag, id }]
        })
    }),
});
const { useCreateQuizMutation, useDeleteQuizMutation, useUpdateQuizMutation, useSearchQuizQuery, useSearchMineQuizByKeywordQuery, useReadQuizDetailQuery, useReadQuizQuery } = quizApi;
export const quizHooks = {
    useSearchQuizQuery,
    useSearchMineQuizByKeywordQuery,
    useReadQuizQuery,
    useReadQuizDetailQuery,
    useCreateQuizMutation,
    useUpdateQuizMutation,
    useDeleteQuizMutation
};