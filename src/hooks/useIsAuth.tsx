import { useAppSelector } from "@/redux/hooks"

const useIsAuth = () => {
    const { profile, access_token, role } = useAppSelector(state => state.auth)
    if (profile && access_token && role) {
        return true
    }
    return false;
}

export default useIsAuth