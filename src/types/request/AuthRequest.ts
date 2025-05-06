import { z } from "zod";
export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3)
})
export type AuthRequest = z.infer<typeof authSchema>