import { CustomElement } from "@/components/common/TextEditor/TextEditorType";

export default class FunctionUtil {
    static convertMaptoArray<T,>(object: object | undefined): T[] {
        return object ? Object.values(object) : [];
    }
    static toISOString(date?: string) {
        if (!date) return undefined; // Trả về undefined nếu không có giá trị date
        return new Date(date).toISOString(); // Chuyển yyyy-MM-dd thành ISO string
    }
    static createQueryString<T extends Search>(
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

    static getImageUrlFromContent(content: string) {
        const contentData: CustomElement[] = JSON.parse(content)
        return contentData.filter((item) => item.type === "image" && item.url).map(item => item.url as string);
    }
}