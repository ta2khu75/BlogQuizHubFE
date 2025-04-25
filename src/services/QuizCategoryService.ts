import { BasePath } from "@/env/BasePath";
import instance from "@/util/AxiosInstance";

const basePath = BasePath.QUIZ_CATEGORY
export default class QuizCategoryService {
    static readAll(): Promise<ApiResponse<QuizCategoryResponse[]>> {
        return instance.get(basePath);
    }
    static create(category: QuizCategoryRequest): Promise<ApiResponse<QuizCategoryResponse>> {
        return instance.post(basePath, category);
    }
    static delete(id: number): Promise<ApiResponse<void>> {
        return instance.delete(`${basePath}/${id}`);
    }
    static update(id: number, category: QuizCategoryRequest): Promise<ApiResponse<QuizCategoryResponse>> {
        return instance.put(`${basePath}/${id}`, category);
    }
}