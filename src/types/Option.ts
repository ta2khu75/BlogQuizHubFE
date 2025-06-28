export type Option<T extends string | number> = {
    value: T
    label: string,
    icon?: React.ReactNode
}