import { z } from "zod";
export const accountProfileBaseSchema = z.object({
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    birthday: z.date(),
})

export type AccountProfileBase = z.infer<typeof accountProfileBaseSchema>;