import { RoleRequest } from "@/types/request/RoleRequest";
import { BasePath } from "../env/BasePath";
import instance from "../util/AxiosApi";
const basePath = BasePath.ROLE;
export default class RoleService {
    static readAll(): Promise<ApiResponse<RoleResponse[]>> {
        return instance.get(basePath);
    }
    static create(role: RoleRequest): Promise<ApiResponse<RoleResponse>> {
        return instance.post(basePath, { ...role, permission_ids: Array.from(role.permission_ids) });
    }
    static update(id: number, role: RoleRequest): Promise<ApiResponse<RoleResponse>> {
        return instance.put(`${basePath}/${id}`, { ...role, permission_ids: Array.from(role.permission_ids) });
    }
    static delete(id: number): Promise<ApiResponse<void>> {
        return instance.delete(`${basePath}/${id}`);
    }
    static readById(id: number): Promise<ApiResponse<RoleResponse>> {
        return instance.get(`${basePath}/${id}`);
    }
}