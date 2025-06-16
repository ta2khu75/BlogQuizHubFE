import { useAppSelector } from "@/redux/hooks"

const useAuth = () => {
    const auth = useAppSelector(state => state.auth)
    const { profile, access_token, role } = auth
    if (profile && access_token && role) {
        return auth
    }
    return null;
}

export default useAuth