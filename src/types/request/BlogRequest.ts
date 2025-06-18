import { AccessModifier } from "@/types/AccessModifier";
import { BlogBase } from "@/types/base/BlogBase";
import { z } from "zod";

export interface BlogRequest extends BlogBase {
    content: string;
    quiz_ids?: { id: string }[];
}
export const blogRequestSchema = z.object({
    title: z.string().min(3),
    content: z.string(),
    tags: z.array(z.object({
        id: z.number().int().positive().optional(),
        name: z.string().min(3, {
            message: "Tag name must not be empty"
        }).nonempty()
    })).min(1),
    access_modifier: z.nativeEnum(AccessModifier),
    quiz_ids: z.array(z.object({ id: z.number().int().positive() })).optional()
})
// export type BlogRequestSchema = z.infer<typeof blogRequestSchema>;