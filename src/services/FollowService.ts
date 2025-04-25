import { BasePath } from "@/env/BasePath";
import instance from "@/util/AxiosInstance";

const basePath = BasePath.FOLLOW;
export class FollowService {
    static follow(followingId: string): Promise<ApiResponse<FollowResponse>> {
        return instance.get(`${basePath}/account/${followingId}`);
    }
    static unFollow(followingId: string): Promise<ApiResponse<FollowResponse>> {
        return instance.delete(`${basePath}/account/${followingId}`);
    }
    static checkFollowing(followingId: string): Promise<ApiResponse<BooleanResponse>> {
        return instance.get(`${basePath}/account/${followingId}/check`);
    }
    static readPageFollower(followingId: string, page = 1, size = 10): Promise<ApiResponse<PageResponse<FollowResponse>>> {
        return instance.get(`${basePath}/follower/${followingId}`, { params: { page, size } });
    }
}