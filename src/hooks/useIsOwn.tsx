"use client"
import { useAppSelector } from '@/redux/hooks'
import { useSearchParams } from 'next/navigation'

const useIsOwner = () => {
    const profile = useAppSelector(state => state.auth.profile)
    const searchParams = useSearchParams()
    const profile_id = searchParams.get('id')
    if (!profile || !profile_id) return false
    return profile?.id === Number(profile_id)
}

export default useIsOwner