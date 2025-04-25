import { BasePath } from "@/env/BasePath";
import instance from "@/util/AxiosInstance";

const basePath = BasePath.BLOG_TAG
export class BlogTagService {
    static readAll(): Promise<ApiResponse<BlogTagResponse[]>> {
        return instance.get(basePath);
    }
    static search(keyword: string): Promise<ApiResponse<BlogTagResponse[]>> {
        return instance.get(`${basePath}/${keyword}`);
    }
}