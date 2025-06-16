import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useQueryParam } from '@/hooks/useQueryParam'
import { FollowService } from '@/services/FollowService'
import { FollowResponse } from '@/types/response/FollowResponse'
import React, { useEffect, useState } from 'react'
const FollowProfile = () => {
    const { toast } = useToast()
    const profileId = useQueryParam("id")
    const [disable, setDisable] = useState(false)
    const [follow, setFollow] = useState<FollowResponse>()
    useEffect(() => {
        fetchReadFollow()
    }, [profileId])
    const fetchReadFollow = () => {
        if (!profileId) return;
        setDisable(true)
        FollowService.follow(profileId).then(res => {
            setFollow(res.data)
            setDisable(false);
        }).catch(err => {
            toast({ variant: "destructive", description: err.message })
        })
    }
    const onClick = () => {
        if (!profileId) return;
        if (follow) {
            fetchUnFollow()
        } else {
            fetchFollow()
        }
    }
    const fetchUnFollow = () => {
        if (!profileId) return;
        setDisable(true)
        FollowService.unFollow(profileId).then(res => {
            setFollow(res.data)
            setDisable(false);
            setProfile(prev => ({ ...prev!, follow_count: (prev?.follow_count ?? 0) - 1 }));
        }).catch(err => {
            toast({ variant: "destructive", description: err.message })
        })
    }
    const fetchFollow = () => {
        if (!profileId) return;
        setDisable(true)
        FollowService.follow(profileId).then(res => {
            setFollow(res.data)
            setDisable(false);
            setProfile(prev => ({ ...prev!, follow_count: (prev?.follow_count ?? 0) + 1 }));
        }).catch(err => {
            toast({ variant: "destructive", description: err.message })
        })
    }
    return (
        <Button onClick={onClick} disabled={disable}>{follow ? "Un Follow" : "Follow"}</Button>
    )
}

export default FollowProfile