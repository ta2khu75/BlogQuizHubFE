import { ReportId } from "@/types/id/ReportId"
import { ReportStatus } from "@/types/ReportStatus"
import { ReportType } from "@/types/ReportType"
import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse"
import { BaseResponse } from "@/types/response/BaseResponse"
import { BlogResponse } from "@/types/response/BlogResponse"
import { QuizResponse } from "@/types/response/QuizResponse"

export interface ReportResponse extends BaseResponse<ReportId> {
    type: ReportType
    status: ReportStatus
    account: AccountProfileResponse
    target: BlogResponse | QuizResponse
}