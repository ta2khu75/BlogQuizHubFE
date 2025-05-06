import Modal from '@/components/common/Modal'
import AccountPasswordForm from '@/components/form/AccountPasswordForm'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import AuthService from '@/services/AuthService'
import { AccountPasswordRequest } from '@/types/request/account/AccountPasswordRequest'
import React, { useState } from 'react'

const ChangePassword = () => {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const onSubmit = async (value: AccountPasswordRequest) => {
        try {
            await AuthService.changePassword(value)
            setOpen(false)
        } catch (error) {
            const err = error as ApiResponse<object>
            toast({ variant: 'destructive', description: err.message })
        }
    }
    return (
        <>
            <Button onClick={() => setOpen(true)}>Change Password</Button>
            <Modal open={open} onCancel={() => setOpen(false)} title='Change Password' description='Please enter your new password'>
                <AccountPasswordForm onSubmit={onSubmit} />
            </Modal>
        </>
    )
}

export default ChangePassword