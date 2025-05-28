"use client"
import ChangePassword from '@/components/elements/content/profile/ChangePassword';
import ChangeProfile from '@/components/elements/content/profile/ChangeProfile';
import FollowProfile from '@/components/elements/content/profile/FollowProfile';
import TabContent from '@/components/elements/content/profile/TabContent';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import useIsOwner from '@/hooks/useIsOwn';
import AccountService from '@/services/AccountService';
import { AccountProfileResponse } from '@/types/response/Account/AccountProfileResponse';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
const ProfilePage = () => {
    const searchParams = useSearchParams()
    const profile_id = searchParams.get('id')
    const isOwner = useIsOwner();
    const [profile, setProfile] = useState<AccountProfileResponse>()
    useEffect(() => {
        fetchProfile()
    }, [profile_id])
    const fetchProfile = () => {
        if (!profile_id) return
        AccountService.readProfile(Number(profile_id)).then(res => {
            setProfile(res.data)
        }).catch(err => {
            const error = err as ApiResponse<object>;
            toast({ variant: 'destructive', title: 'Error', description: error.message })
        })
    }

    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <Avatar className='w-20 h-20'>
                        <AvatarFallback className='text-2xl'>
                            {profile?.display_name[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className='text-2xl'>{profile?.display_name}</div>
                </div>
                <div className=' flex gap-4'>
                    {
                        isOwner ? <>
                            <ChangeProfile profile={profile} />
                            <ChangePassword />
                        </> : <FollowProfile setProfile={setProfile} />
                    }
                </div>
            </div>
            <TabContent profile={profile} />
        </div>
    )
}

export default ProfilePage