import { z } from "zod";
import { accountProfileBaseSchema } from "@/types/base/AccountProfileBase";

export const accountProfileRequestSchema = accountProfileBaseSchema.extend({
    display_name: z.string().min(3),
})
export type AccountProfileRequest = z.infer<typeof accountProfileRequestSchema>;