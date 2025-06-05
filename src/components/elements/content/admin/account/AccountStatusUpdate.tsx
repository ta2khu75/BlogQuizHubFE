import Modal from '@/components/common/Modal'
import AccountStatusForm from '@/components/form/AccountStatusForm'
import { accountHooks } from '@/redux/api/accountApi'
import { AccountStatusRequest } from '@/types/request/account/AccountStatusRequest'
import { AccountResponse } from '@/types/response/Account/AccountResponse'
import { handleMutation } from '@/util/mutation'
import React, { Dispatch, SetStateAction } from 'react'
type Props = {
  roles: RoleResponse[],
  account: AccountResponse,
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
const AccountStatusUpdate = ({ roles, account, open, setOpen }: Props) => {
  const [updateStatus, { isLoading }] = accountHooks.useUpdateStatusMutation()
  const onSubmit = async (value: AccountStatusRequest) => {
    if (isLoading) return
    await handleMutation(
      () => updateStatus({ id: account.id, body: value }).unwrap(),
      () => setOpen(false),
      undefined, {
      error: 'Update failed',
      success: 'Update success'
    }
    )
  }
  return (
    <Modal open={open} setOpen={setOpen} title="Update Account Status">
      <AccountStatusForm onSubmit={onSubmit} roles={roles} account={account} />
    </Modal>
  )
}

export default AccountStatusUpdate