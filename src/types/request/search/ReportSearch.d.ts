import { ReportStatus } from "@/types/ReportStatus";
import { TargetType } from "@/types/TargetType";

interface ReportSearch extends Search {
    targetType?: TargetType,
    reportType?: ReportType,
    reportStatus?: ReportStatus,
    fromDate?: string,
    toDate?: string
}