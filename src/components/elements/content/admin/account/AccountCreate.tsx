import Modal from '@/components/common/Modal'
import AccountForm from '@/components/form/AccountForm'
import { Button } from '@/components/ui/button'
import AccountService from '@/services/AccountService'
import { AccountRequest } from '@/types/request/account/AccountRequest'
import { AccountResponse } from '@/types/response/Account/AccountResponse'
import { handleMutation } from '@/util/mutation'
import StateHelpers from '@/util/StateHelpers'
import React, { Dispatch, SetStateAction, useState } from 'react'
type Props = {
    setAccountPage: Dispatch<SetStateAction<PageResponse<AccountResponse> | undefined>>,
    roles: RoleResponse[]
}
const AccountCreate = ({ setAccountPage, roles }: Props) => {
    const [open, setOpen] = useState(false)
    const onSubmit = (value: AccountRequest) => {
        handleMutation<AccountRequest, AccountResponse>(value,
            (val) => AccountService.create(val),
            (response) => {
                setOpen(false)
                StateHelpers.prependStatePage(setAccountPage, response.data)
            },
            undefined,
            { success: 'Create success', error: 'Create failed' })
    }
    return (
        <>
            <Button onClick={() => setOpen(true)}>Create</Button>
            <Modal open={open} onCancel={() => setOpen(false)} title="Create Account">
                <AccountForm roles={roles} onSubmit={onSubmit} />
            </Modal>
        </>
    )
}

export default AccountCreate 