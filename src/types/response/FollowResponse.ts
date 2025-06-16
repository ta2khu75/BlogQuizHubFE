import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse"

export interface FollowResponse {
    following: AccountProfileResponse
    follower: AccountProfileResponse
}