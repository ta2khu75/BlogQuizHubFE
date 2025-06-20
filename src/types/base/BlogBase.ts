import { AccessModifier } from "@/types/AccessModifier";
import { z } from "zod";

// export interface BlogBase {
//     title: string;
//     tags: BlogTag[];
//     access_modifier: AccessModifier;
// }

export const blogBaseSchema = z.object({
    title: z.string().min(3, { message: "Blog title must not be empty" }).nonempty(),
    tags: z.array(z.object({ id: z.number().int().positive().optional(), name: z.string().min(3, { message: "Tag name must not be empty" }).nonempty() })).min(1),
    access_modifier: z.nativeEnum(AccessModifier),
})
export type BlogBase = z.infer<typeof blogBaseSchema>;