// src/utils/mutation.ts

import { toast } from "@/hooks/use-toast";

export const handleMutation = async<T, R>(
    value: T,
    serviceFn: (val: T) => Promise<ApiResponse<R>>,
    onSuccess: (data: ApiResponse<R>) => void,
    onError?: (error: ApiResponse<object>) => void,
    messages?: {
        success?: string;
        error?: string;
    }
) => {
    try {
        const response = await serviceFn(value);
        if (messages?.success) {
            toast({ title: messages.success });
        }
        onSuccess(response);
    } catch (error) {
        const err = error as ApiResponse<object>;
        if (messages?.error) {
            toast({ title: messages.error, description: err.message, variant: 'destructive' });
        }
        onError?.(err);
    }
};
