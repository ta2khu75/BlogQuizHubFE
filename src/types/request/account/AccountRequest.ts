import { accountProfileBaseSchema } from "@/types/base/AccountProfileBase";
import { z } from "zod"
export const accountRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
    role_id: z.number().int().positive().optional(),
    profile: accountProfileBaseSchema
}).refine(data => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
});
export type AccountRequest = z.infer<typeof accountRequestSchema>