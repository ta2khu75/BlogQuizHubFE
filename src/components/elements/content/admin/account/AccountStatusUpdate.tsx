import Modal from '@/components/common/Modal'
import AccountStatusForm from '@/components/form/AccountStatusForm'
import AccountService from '@/services/AccountService'
import { AccountStatusRequest } from '@/types/request/account/AccountStatusRequest'
import { AccountResponse } from '@/types/response/Account/AccountResponse'
import { AccountStatusResponse } from '@/types/response/Account/AccountStatusResponse'
import { handleMutation } from '@/util/mutation'
import StateHelpers from '@/util/S/StateHelpers'
import React, { Dispatch, SetStateAction } from 'react'
type Props = {
  setAccountPage: Dispatch<SetStateAction<PageResponse<AccountResponse> | undefined>>,
  roles: RoleResponse[],
  account: AccountResponse,
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
const AccountStatusUpdate = ({ setAccountPage, roles, account, open, setOpen }: Props) => {
  const onSubmit = (value: AccountStatusRequest) => {
    if (account.status.id) {
      handleMutation<AccountStatusRequest, AccountStatusResponse>(value,
        (val) => AccountService.updateStatus(account.status.id, val),
        (res) => {
          StateHelpers.updateItemById(setAccountPage, { ...account, status: res.data })
        }
      )
    }
  }
  return (
    <Modal open={open} onCancel={() => setOpen(false)} title="Update Account Status">
      <AccountStatusForm onSubmit={onSubmit} roles={roles} account={account} />
    </Modal>
  )
}

export default AccountStatusUpdate