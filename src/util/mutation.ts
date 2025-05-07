// src/utils/mutation.ts

import { toast } from "@/hooks/use-toast";

export const handleMutation = async<T, R>(
    value: T,
    serviceFn: (val: T) => Promise<ApiResponse<R>>,
    onSuccess: (data: ApiResponse<R>) => void,
    messages?: {
        success?: string;
        error?: string;
    },
    onError?: (error: ApiResponse<object>) => void,
) => {
    try {
        const response = await serviceFn(value);
        toast({ title: messages?.success || 'Thao tác thành công' });
        onSuccess(response);
    } catch (error) {
        const err = error as ApiResponse<object>;
        toast({
            title: messages?.error || 'Thao tác thất bại',
            description: err.message,
            variant: 'destructive',
        });
        onError?.(err);
    }
};
