import slugify from "slugify";

export default class SlugUtil {
    static convertSlugUrl(str?: string): string {
        if (!str) return "";
        return slugify(str, { locale: 'vi', lower: true });
    }
    static readIdFromSlug(slug: string): string {
        const match = slug.match(/-([a-zA-Z0-9]+)\.html$/);
        const fullId = match?.[1] ?? "";
        return fullId.slice(1);
    }
    static createSlugFromId(name: string, prefix: string, id: string | number): string {
        return `${this.convertSlugUrl(name)}-${prefix}${id}.html`;
    }
    static readPrefixFromSlug(slug: string): string {
        const match = slug.match(/-([a-zA-Z])[a-zA-Z0-9]*\.html$/);
        return match?.[1] ?? "";
    }
}