import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
interface ErrorResponse {
    status: 422,
    data: {
        error: ValidationError;
    }
}
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && 'status' in error && 'data' in error;
}
export function isErrorWithMessage(error: unknown): error is SerializedError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string';
}
export function isErrorResponse(error: unknown): error is ErrorResponse {
    return isFetchBaseQueryError(error) && error.status === 422 && typeof error.data === 'object' && error.data !== null && !Array.isArray(error.data);
}