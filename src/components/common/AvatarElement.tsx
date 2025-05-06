import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
type Props = {
    profile?: AccountProfileResponse
}
const AvatarElement = ({ profile }: Props) => {
    return (
        <div className='flex items-center gap-x-2'>
            <Avatar >
                <AvatarFallback>
                    {profile?.display_name[0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
            {profile?.display_name}
        </div>
    )
}

export default AvatarElement