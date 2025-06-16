import { AccessModifier } from "@/types/AccessModifier";
import { BlogTag } from "@/types/BlogTag";

export interface BlogBase {
    title: string;
    tags: BlogTag[];
    access_modifier: AccessModifier;
}