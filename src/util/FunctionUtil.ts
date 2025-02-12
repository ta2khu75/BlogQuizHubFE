import { z } from "zod";

export default class FunctionUtil {
    static convertMaptoArray = <T,>(object: object | undefined): T[] => {
        return object ? Object.values(object) : [];
    }
    static isType<T extends object>(object: object, field: string): object is T {
        return field in object
    }

    static capitalizeFirstLetter = (str: string) => (str.charAt(0).toUpperCase() + str.slice(1)).replace(/_/g, ' ');
    static showError = (error: unknown) => {
        console.log(error);

        return error instanceof Error ? error.message : "An unexpected error occurred";
    }
    static isInfoResponse = (object: object): object is InfoResponse => {
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
    // static getDataResponse<T extends Object>(set: (value: T) => void, toast: Toast)
}