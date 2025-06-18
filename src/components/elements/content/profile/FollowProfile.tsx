import { Button } from '@/components/ui/button'
import useIsOwner from '@/hooks/useIsOwn'
import { followHooks } from '@/redux/api/followApi'
import { handleMutation } from '@/util/mutation'
import React, { useMemo } from 'react'
type Props = {
    profileId: number
}
const FollowProfile = ({ profileId }: Props) => {
    const { data } = followHooks.useReadFollowQuery(Number(profileId), { skip: !profileId })
    const followData = useMemo(() => data?.data, [data])
    const [follow, { isLoading: followLoading }] = followHooks.useFollowMutation()
    const [unFollow, { isLoading: unFollowLoading }] = followHooks.useUnFollowMutation()
    const isOwner = useIsOwner(profileId);
    const onClick = () => {
        if (followData) {
            fetchUnFollow()
        } else {
            fetchFollow()
        }
    }
    const fetchUnFollow = async () => {
        if (unFollowLoading) return
        await handleMutation(() => unFollow(profileId).unwrap(), () => { }, undefined, { success: "Unfollow success", error: "Unfollow failed" })
    }
    const fetchFollow = async () => {
        if (followLoading) return
        await handleMutation(() => follow(profileId).unwrap(), () => { }, undefined, { success: "Follow success", error: "Follow failed" })
    }
    if (isOwner) return null;
    return (
        <Button onClick={onClick} disabled={followLoading || unFollowLoading}>{followData ? "Un Follow" : "Follow"}</Button>
    )
}

export default FollowProfile