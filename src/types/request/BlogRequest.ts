import { AccessModifier } from "@/types/AccessModifier";
import { BlogBase, blogBaseSchema } from "@/types/base/BlogBase";
import { z } from "zod";

// export interface BlogRequest extends BlogBase {
//     content: string;
//     quiz_ids?: { id: string }[];
// }
export const blogRequestSchema = blogBaseSchema.extend({
    content: z.string(),
    quiz_ids: z.array(z.object({ id: z.string() })).optional()
})
export type BlogRequest = z.infer<typeof blogRequestSchema>;