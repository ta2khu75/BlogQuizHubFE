import { PermissionResponse } from "@/types/response/PermissionResponse";

export interface PermissionGroupResponse {
    name: string;
    permissions: PermissionResponse[];
}