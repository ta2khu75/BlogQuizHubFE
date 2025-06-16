export interface ApiResponse<T> {
    status: number;
    data: T;
    error: ValidationError
    message: string;
}
type ValidationError = {
    [field: string]: string | ValidationError | ValidationError[];
};