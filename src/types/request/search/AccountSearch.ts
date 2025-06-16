import { Search } from "@/types/request/search/Search"

export interface AccountSearch extends Search {
    enabled?: boolean
    non_locked?: boolean
    role_id?: number
    createdFrom?: Date
    createdTo?: Date
}