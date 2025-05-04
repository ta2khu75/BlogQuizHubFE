import { BasePath } from "@/env/BasePath";
import { ReportStatus } from "@/types/ReportStatus";
import { ReportSearch } from "@/types/request/search/ReportSearch";
import instance from "@/util/AxiosApi";
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
    static search(reportSearch: ReportSearch): Promise<ApiResponse<PageResponse<ReportResponse>>> {
        return instance.get(basePath, { params: { ...reportSearch } });
    }
    static updateStatus(id: ReportId, report_status: ReportStatus): Promise<ApiResponse<ReportResponse>> {
        return instance.patch(`${basePath}/status`, { id, report_status });
    }
}