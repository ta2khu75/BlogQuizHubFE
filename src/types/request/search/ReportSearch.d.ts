import { ReportStatus } from "@/types/ReportStatus";
import { TargetType } from "@/types/TargetType";

interface ReportSearch extends Search {
    target_type?: TargetType,
    type?: ReportType,
    status?: ReportStatus,
    from_date?: Date,
    to_date?: Date
}