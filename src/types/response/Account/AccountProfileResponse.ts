import { AccountProfileBase } from "@/types/base/AccountProfileBase";

export interface AccountProfileResponse extends AccountProfileBase {
    id: number;
    display_name: string;
    blog_count?: number;
    quiz_count?: number;
    follow_count?: number;
    updated_at: string;
}