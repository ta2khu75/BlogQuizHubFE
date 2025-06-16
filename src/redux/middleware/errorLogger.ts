import { isRejected, isRejectedWithValue, Middleware, MiddlewareAPI, UnknownAction } from "@reduxjs/toolkit";
function isPayloadErrorMessage(payload: unknown): payload is {
    data: {
        message: string
        status: number
    },
} {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof payload === "object" && payload !== null && 'data' in payload && typeof (payload as any).data?.message === "string"
}
import { toast } from "@/hooks/use-toast";
export const rtkQueryErrorLoggger: Middleware = (api: MiddlewareAPI) => (next) => (action: UnknownAction) => {
    const payload = action.payload;
    if (isRejectedWithValue(action) && isPayloadErrorMessage(payload) && payload.data.status !== 422) {
        toast({
            variant: "error",
            title: "Error",
            description: payload.data.message,
        });
    }
    else if (isRejected(action)) {
        console.warn(action);
    }
    return next(action);
}