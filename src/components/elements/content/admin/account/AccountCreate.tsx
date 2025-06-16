import Modal from '@/components/common/Modal'
import AccountForm from '@/components/form/AccountForm'
import { Button } from '@/components/ui/button'
import { accountHooks } from '@/redux/api/accountApi'
import { AccountRequest } from '@/types/request/account/AccountRequest'
import { AccountResponse } from '@/types/response/Account/AccountResponse'
import { handleMutation } from '@/util/mutation'
import { useState } from 'react'
type Props = {
    roles: RoleResponse[]
}
const AccountCreate = ({ roles }: Props) => {
    const [open, setOpen] = useState(false)
    const [createAccount, { isLoading }] = accountHooks.useCreateAccountMutation()
    const onSubmit = async (value: AccountRequest) => {
        if (isLoading) return; // Prevent multiple submissions
        await handleMutation<AccountResponse>(
            () => createAccount(value).unwrap(),
            () => setOpen(false),
            undefined,
            { success: 'Create success', error: 'Create failed' })
    }
    return (
        <>
            <Button onClick={() => setOpen(true)}>Create</Button>
            <Modal open={open} setOpen={setOpen} title="Create Account">
                <AccountForm roles={roles} onSubmit={onSubmit} />
            </Modal>
        </>
    )
}

export default AccountCreate 