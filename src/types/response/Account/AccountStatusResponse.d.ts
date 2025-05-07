import { AccountStatusBase } from "@/types/base/AccountStatusBase";

interface AccountStatusResponse extends AccountStatusBase {
    id: number;
    role: RoleResponse;
    updated_at: string;
    updated_by: string;
}