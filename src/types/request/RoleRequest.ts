import { z } from "zod";

export const roleSchema = z.object({
    name: z.string().nonempty().min(3, { message: "Role name is required" }),
    permission_ids: z.set(z.number()).nonempty({ message: "At least one permission is required" })
})
export type RoleRequest = z.infer<typeof roleSchema>