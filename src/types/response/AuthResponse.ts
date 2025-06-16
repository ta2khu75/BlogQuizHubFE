import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse";

export interface AuthResponse {
    profile: AccountProfileResponse;
    role: string;
    access_token: string;
}