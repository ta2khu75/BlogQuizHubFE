import { AccountStatusBase } from "@/types/base/AccountStatusBase";

export interface AccountStatusResponse extends AccountStatusBase {
    id: number;
    role: RoleResponse;
    updated_at: string;
    updated_by: string;
}