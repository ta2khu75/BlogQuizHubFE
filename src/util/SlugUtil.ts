import slugify from "slugify";

export default class SlugUtil {
    static convertSlugUrl(str?: string): string {
        if (!str) return "";
        return slugify(str, { locale: 'vi', lower: true });
    }
    static getIdFromSlugUrl(url: string): string {
        const urlParts = url.split('.html');
        return urlParts[0].split('-').pop() ?? "";
    }
}