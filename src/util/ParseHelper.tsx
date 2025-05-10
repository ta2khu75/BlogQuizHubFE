export default class ParseHelper {
    static parseBoolean(value: string | null): boolean | undefined {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return undefined;
    };
    static parseDate(value: string | null): Date | undefined {
        return value ? new Date(value) : undefined;
    };
    static parseNumber(value: string | null): number | undefined {
        return value ? Number(value) : undefined;
    }

}