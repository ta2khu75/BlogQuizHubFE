import { useAppSelector } from '@/redux/hooks';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react'
const useIsAuthor = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const auth = useAppSelector(state => state.auth.account);
    const isAuthor = useMemo(() => { return id === auth?.info.id }, [auth, id])
    return isAuthor
}

export default useIsAuthor