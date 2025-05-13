import { ReadonlyURLSearchParams } from "next/navigation"

export const createQueryString = (search: Search, searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page')
    params.delete('size')
    Object.entries(search).forEach(([key, value]) => {
        if (value === undefined) {
            params.delete(key)
        }
        else if (Array.isArray(value)) {
            params.delete(key)
            value.forEach(val => params.append(key, val as string))
        }
        else {
            params.set(key, value as string)
        }
    })
    return params.toString()
}