import slugify from 'slugify';
export default class StringUtil {
    static checkEmpty(str: string): boolean {
        return /^\s*$/.test(str);
    }
    static convertSlugUrl(str: string): string {
        return slugify(str, { locale: 'vi', lower: true });
    }
    static getIdFromSlugUrl(url: string): string {
        const urlParts = url.split('.html');
        return urlParts[0].split('-').pop() ?? "";
    }
}