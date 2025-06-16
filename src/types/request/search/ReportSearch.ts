import { ReportStatus } from "@/types/ReportStatus";
import { ReportType } from "@/types/ReportType";
import { Search } from "@/types/request/search/Search";
import { TargetType } from "@/types/TargetType";

export interface ReportSearch extends Search {
    target_type?: TargetType,
    type?: ReportType,
    status?: ReportStatus,
    from_date?: Date,
    to_date?: Date
}