import { accountStatusBaseSchema } from "@/types/base/AccountStatusBase";
import { z } from "zod";

export const accountStatusRequestSchema = accountStatusBaseSchema.extend({
    role_id: z.number().int().positive(),
})
export type AccountStatusRequest = z.infer<typeof accountStatusRequestSchema>;