import { z } from "zod";

export const accountPasswordSchema = z.object({
    password: z.string().min(8),
    new_password: z.string().min(8),
    confirm_password: z.string().min(8),
}).refine(data => data.new_password === data.confirm_password, {
    message: 'confirm password not match',
    path: ['confirm_password'],
});
export type AccountPasswordRequest = z.infer<typeof accountPasswordSchema>