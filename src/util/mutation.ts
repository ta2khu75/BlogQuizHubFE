import { toast } from "@/hooks/use-toast";

export const handleMutation = async<R>(
    serviceFn: () => Promise<ApiResponse<R>>,
    onSuccess: (data: ApiResponse<R>) => void,
    onError?: (error: ApiResponse<void>) => void,
    messages?: {
        success?: string;
        error?: string;
    }
) => {
    try {
        const response = await serviceFn();
        if (messages?.success) {
            toast({ variant: 'success', title: messages.success });
        }
        onSuccess(response);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const err = (error as { data?: ApiResponse<void> })?.data;
        if (messages?.error && err) {
            toast({ title: messages.error, description: err.message, variant: 'error' });
        }
        if (err) onError?.(err);
        else {
            // Optional: fallback in case error has no `data`
            onError?.({
                status: 500,
                message: "Unknown error",
                data: undefined
            });
        }
    }
};
