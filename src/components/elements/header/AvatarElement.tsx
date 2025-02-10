import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
type Props = {
    account?: AccountResponse
}
const AvatarElement = ({ account }: Props) => {
    return (
        <div className='flex items-center gap-x-2'>
            <Avatar >
                <AvatarFallback>
                    {account?.username[0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
            {account?.username}
        </div>
    )
}

export default AvatarElement