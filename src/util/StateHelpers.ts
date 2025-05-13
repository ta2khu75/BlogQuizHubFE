import _ from "lodash";

export default class StateHelpers {
    static updateItemById<T extends { id: number | string }>(
        setState: React.Dispatch<React.SetStateAction<T[]>>,
        updatedItem: T
    ) {
        setState((prev) => {
            if (!prev) return prev;
            return prev.map((item) => (item.id === updatedItem.id ? updatedItem : item));
        })
    }
    static removeItemById<T extends { id: number | string }>(
        setState: React.Dispatch<React.SetStateAction<T[]>>,
        idToRemove: T['id']
    ) {
        setState((prev) => {
            if (!prev) return prev;
            return prev.filter((item) => item.id !== idToRemove);
        })
    }
    static prependState<T>(
        setState: React.Dispatch<React.SetStateAction<T[]>>,
        newItem: T
    ) {
        setState((prev) => {
            if (!prev) return prev;
            return [newItem, ...prev];
        });
    }
    static appendState<T>(
        setState: React.Dispatch<React.SetStateAction<T[]>>,
        newItem: T
    ) {
        setState((prev) => {
            if (!prev) return prev;
            return [...prev, newItem];
        });
    }

    static prependStatePage<T>(
        setState: React.Dispatch<React.SetStateAction<PageResponse<T> | undefined>>,
        newItem: T
    ) {
        setState((prev) => {
            if (!prev) return prev;
            return { ...prev, content: [newItem, ...(prev.content || [])] };
        });
    }
    static appendStatePage<T>(
        setState: React.Dispatch<React.SetStateAction<PageResponse<T> | undefined>>,
        newItem: T
    ) {
        setState((prev) => {
            if (!prev) return prev;
            return { ...prev, content: [...(prev.content || []), newItem] };
        });
    }
    static updateItemByIdPage<T extends { id: number | string | object }>(
        setState: React.Dispatch<React.SetStateAction<PageResponse<T> | undefined>>,
        updatedItem: T
    ) {
        setState((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                content: (prev.content || []).map((item) =>
                    _.isEqual(item.id, updatedItem.id) ? updatedItem : item
                )
            };
        });
    }
    static removeItemByIdPage<T extends { id: number | string | object }>(
        setState: React.Dispatch<React.SetStateAction<PageResponse<T> | undefined>>,
        idToRemove: T['id']
    ) {
        setState((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                content: (prev.content || []).filter((item) => !_.isEqual(item.id, idToRemove))
            };
        });
    }
}