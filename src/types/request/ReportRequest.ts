import { ReportType } from "@/types/ReportType";
import { TargetType } from "@/types/TargetType";

export interface ReportRequest {
    type: ReportType;
    target_id: string;
    target_type: TargetType;
}