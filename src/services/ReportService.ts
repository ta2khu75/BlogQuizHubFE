import { BasePath } from "@/env/BasePath";
import instance from "@/util/apiInstance";
const basePath = BasePath.REPORT
export default class ReportService {
    static create(date: ReportRequest): Promise<ApiResponse<PageResponse<ReportResponse>>> {
        return instance.post(basePath, date);
    }
    static read(targetId: string): Promise<ApiResponse<ReportResponse>> {
        return instance.get(`${basePath}/${targetId}`);
    }
    static update(targetId: string, date: ReportRequest): Promise<ApiResponse<ReportResponse>> {
        return instance.put(`${basePath}/${targetId}`, date);
    }
    static delete(targetId: string): Promise<void> {
        return instance.delete(`${basePath}/${targetId}`);
    }
}