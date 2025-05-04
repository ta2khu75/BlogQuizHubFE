import { useAppSelector } from "@/redux/hooks";

export function useAuth() {
    const profile = useAppSelector(state => state.auth.profile)
    return profile !== undefined
}
