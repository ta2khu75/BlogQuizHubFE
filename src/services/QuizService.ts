import { BasePath } from '@/env/BasePath';
import instance from '@/util/AxiosInstance';
import qs from 'qs';
const basePath = BasePath.QUIZ
export default class QuizService {
    static search(quizSearch: QuizSearch): Promise<ApiResponse<PageResponse<QuizResponse>>> {
        return instance.get(basePath, {
            params: { ...quizSearch }, paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        })
    }

    static readAllByKeyword(keyword: string): Promise<ApiResponse<QuizResponse[]>> {
        return instance.get(`${basePath}/mine/${keyword}`)
    }
    // static myReadAllById(ids: string[]): Promise<ApiResponse<QuizResponse[]>> {
    //     return instance.get(`${basePath}/mine/ids`, { params: { ids } })
    // }
    static create(data: QuizRequest, image: File): Promise<ApiResponse<QuizResponse>> {
        const form = new FormData();
        form.append("image", image)
        form.append("quiz", JSON.stringify(data));
        return instance.post(basePath, form);
    }
    static update(id: string, data: QuizRequest, image?: File): Promise<ApiResponse<QuizResponse>> {
        const form = new FormData();
        if (image) {
            form.append("image", image)
        }
        form.append("quiz", JSON.stringify(data));
        return instance.put(`${basePath}/${id}`, form);
    }
    static delete(id: string): Promise<ApiResponse<void>> {
        return instance.delete(`${basePath}/${id}`);
    }
    static readDetail(id: string): Promise<ApiResponse<QuizResponse>> {
        return instance.get(`${basePath}/${id}/detail`);
    }
    static read(id: string): Promise<ApiResponse<QuizResponse>> {
        return instance.get(`${basePath}/${id}`);
    }
}