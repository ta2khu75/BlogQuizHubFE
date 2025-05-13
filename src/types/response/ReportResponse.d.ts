import { ReportId } from "@/types/id/ReportId"

export interface ReportResponse extends BaseResponse<ReportId> {
    type: ReportType
    status: ReportStatus
    account: AccountProfileResponse
    target: BlogResponse | QuizResponse
}