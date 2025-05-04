import { z } from "zod";

export const accountRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
    confirm_password: z.string().min(3),
    profile: z.object({
        first_name: z.string().min(3),
        last_name: z.string().min(3),
        birthday: z.date()
    })
}).refine(data => data.password === data.confirm_password, {
    message: 'confirm password not match',
    path: ['confirm_password']
})

export type AccountRequest = z.infer<typeof accountRequestSchema>
