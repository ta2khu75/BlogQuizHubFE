import { z } from "zod";
export const accountStatusBaseSchema = z.object({
    enabled: z.boolean(),
    non_locked: z.boolean(),
})
export type AccountStatusBase = z.infer<typeof accountStatusBaseSchema>;