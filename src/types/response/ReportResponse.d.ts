
interface ReportResponse extends BaseResponse<ReportId> {
    report_type: ReportType
    target_type: ReportTarget
    report_status: ReportStatus
    account: AccountProfileResponse
    target: BlogResponse | QuizResponse
}