import Modal from '@/components/common/Modal'
import AccountProfileForm from '@/components/form/AccountProfileForm'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import AuthService from '@/services/AuthService'
import { AccountProfileRequest } from '@/types/request/account/AccountProfileRequest'
import { AccountProfileResponse } from '@/types/response/Account/AccountProfileResponse'
import { ApiResponse } from '@/types/response/ApiResponse'
import React, { useState } from 'react'
type Props = {
    profile?: AccountProfileResponse
}
const ChangeProfile = ({ profile }: Props) => {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const onSubmit = async (value: AccountProfileRequest) => {
        try {
            await AuthService.changeProfile(value)
            setOpen(false)
            toast({ description: 'Change profile successfully' })
        } catch (error) {
            const err = error as ApiResponse<object>
            toast({ variant: 'destructive', description: err.message })
        }
    }
    return (
        <>
            <Button onClick={() => setOpen(true)}>Change profile</Button>
            <Modal open={open} onCancel={() => setOpen(false)} title='Change Profile' description='Please enter your new profile'>
                <AccountProfileForm profile={profile} onSubmit={onSubmit} />
            </Modal>
        </>
    )
}

export default ChangeProfile