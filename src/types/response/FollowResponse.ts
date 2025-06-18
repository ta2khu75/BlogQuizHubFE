import { FollowId } from "@/types/id/FollowId"
import { AccountProfileResponse } from "@/types/response/Account/AccountProfileResponse"

export interface FollowResponse {
    id: FollowId
    following: AccountProfileResponse
    follower: AccountProfileResponse
    created_at: string
}