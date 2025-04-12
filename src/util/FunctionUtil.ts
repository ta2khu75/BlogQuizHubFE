import { CustomElement } from "@/components/elements/util/TextEditor/TextEditorType";
import { z } from "zod";

export default class FunctionUtil {
    static convertMaptoArray<T,>(object: object | undefined): T[] {
        return object ? Object.values(object) : [];
    }
    static isType<T extends object>(object: object, field: string): object is T {
        return field in object
    }
    static toISOString(date?: string) {
        if (!date) return undefined; // Trả về undefined nếu không có giá trị date
        return new Date(date).toISOString(); // Chuyển yyyy-MM-dd thành ISO string
    }
    static createQueryString<T extends object>(
        searchParams: URLSearchParams,
        search: T
    ): string {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(search).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                params.delete(key);
                value.forEach(val => params.append(key, val));
            } else if (value === undefined) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        return params.toString();
    };

    static capitalizeFirstLetter(str: string) { return (str.charAt(0).toUpperCase() + str.slice(1)).replace(/_/g, ' ') };
    static getImageUrlFromContent(content: string) {
        const contentData: CustomElement[] = JSON.parse(content)
        return contentData.filter((item) => item.type === "image" && item.url).map(item => item.url as string);
    }
    static showError(error: unknown) {
        return error instanceof Error ? error.message : "An unexpected error occurred";
    }
    static isInfoResponse(object: object): object is InfoResponse {
        const infoSchema = z.object({
            id: z.string(),
            created_at: z.string(),
            updated_at: z.string().optional(),
        });
        const parsedUser = infoSchema.safeParse(object);

        if (parsedUser.success) {
            return true;
        } else {
            return false;
        }
    }
}