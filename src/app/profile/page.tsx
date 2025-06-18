"use client"
import ChangePassword from '@/components/elements/content/profile/ChangePassword';
import ChangeProfile from '@/components/elements/content/profile/ChangeProfile';
import FollowProfile from '@/components/elements/content/profile/FollowProfile';
import TabContent from '@/components/elements/content/profile/TabContent';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import useIsOwner from '@/hooks/useIsOwn';
import { accountHooks } from '@/redux/api/accountApi';
import { useSearchParams } from 'next/navigation';
const ProfilePage = () => {
    const searchParams = useSearchParams()
    const profileId = searchParams.get('id')
    const { data } = accountHooks.useReadAccountProfileQuery(Number(profileId), { skip: !profileId })
    const profile = data?.data
    const isOwner = useIsOwner(Number(profileId));

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
                        </> : <FollowProfile profileId={Number(profileId)} />
                    }
                </div>
            </div>
            <TabContent profile={profile} />
        </div>
    )
}

export default ProfilePage