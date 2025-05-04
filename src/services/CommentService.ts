import { BasePath } from "@/env/BasePath";
import instance from "@/util/AxiosApi";

const basePath = BasePath.COMMENT
export class CommentService {
    static read(id: string): Promise<ApiResponse<CommentResponse>> {
        return instance.get(`${basePath}/${id}`);
    }
    static create(comment: CommentRequest): Promise<ApiResponse<CommentResponse>> {
        return instance.post(basePath, comment);
    }
    static update(id: string, comment: CommentRequest): Promise<ApiResponse<CommentResponse>> {
        return instance.put(`${basePath}/${id}`, comment);
    }
    static delete(id: string): Promise<ApiResponse<void>> {
        return instance.delete(`${basePath}/${id}`);
    }
    static readPageByBlog(id: string, page = 1, size = 5): Promise<ApiResponse<PageResponse<CommentResponse>>> {
        return instance.get(`${basePath}/blog/${id}`, { params: { page, size } });
    }
}