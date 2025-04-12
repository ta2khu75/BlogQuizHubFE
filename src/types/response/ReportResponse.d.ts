
interface ReportResponse {
    id: InfoResponse<ReportId>
    report_type: ReportType
    target_type: ReportTarget
    account: AccountResponse
}