import useAuth from '@/hooks/useIsAuth'
const useIsOwner = (authorId?: number) => {
    const auth = useAuth()
    if (!auth || !authorId) return false
    return auth.profile?.id === authorId
}

export default useIsOwner