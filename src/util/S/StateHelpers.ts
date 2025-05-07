export default class StateHelpers {
    static prependState<T>(
        setState: React.Dispatch<React.SetStateAction<PageResponse<T> | undefined>>,
        newItem: T
    ) {
        setState((prev) => {
            if (!prev) return prev;
            return { ...prev, content: [newItem, ...(prev.content || [])] };
        });
    }
    static appendState<T>(
        setState: React.Dispatch<React.SetStateAction<PageResponse<T> | undefined>>,
        newItem: T
    ) {
        setState((prev) => {
            if (!prev) return prev;
            return { ...prev, content: [...(prev.content || []), newItem] };
        });
    }
    static updateItemById<T extends { id: number | string }>(
        setState: React.Dispatch<React.SetStateAction<PageResponse<T> | undefined>>,
        updatedItem: T
    ) {
        setState((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                content: (prev.content || []).map((item) =>
                    item.id === updatedItem.id ? updatedItem : item
                )
            };
        });
    }
    static removeItemById<T extends { id: number | string }>(
        setState: React.Dispatch<React.SetStateAction<PageResponse<T> | undefined>>,
        idToRemove: T['id']
    ) {
        setState((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                content: (prev.content || []).filter((item) => item.id !== idToRemove)
            };
        });
    }



}