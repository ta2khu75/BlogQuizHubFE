import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
type Props = {
    account?: AccountProfileResponse
}
const AvatarElement = ({ account }: Props) => {
    return (
        <div className='flex items-center gap-x-2'>
            <Avatar >
                <AvatarFallback>
                    {account?.display_name[0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
            {account?.display_name}
        </div>
    )
}

export default AvatarElement