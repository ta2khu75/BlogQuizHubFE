import Modal from '@/components/common/Modal'
import RoleForm from '@/components/form/RoleForm'
import RoleService from '@/services/RoleService'
import { RoleRequest } from '@/types/request/RoleRequest'
import { handleMutation } from '@/util/mutation'
import StateHelpers from '@/util/StateHelpers'
import React, { Dispatch, SetStateAction } from 'react'
type Props = {
    setRoles: Dispatch<SetStateAction<RoleResponse[]>>,
    permissionGroups: PermissionGroupResponse[]
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    role: RoleResponse,
}
const RoleUpdate = ({ role, setRoles, permissionGroups, open, setOpen }: Props) => {
    const onSubmit = (value: RoleRequest) => {
        handleMutation<RoleResponse>(
            () => RoleService.update(role.id, value),
            (res) => {
                StateHelpers.updateItemById(setRoles, res.data)
                setOpen(false)
            },
            undefined,
            { success: 'Update success', error: 'Update failed' }
        )
    }
    return (
        <Modal open={open} onCancel={() => setOpen(false)} title="Update Account Status">
            <RoleForm
                permissionGroups={permissionGroups}
                onSubmit={onSubmit}
                role={role}
            />
        </Modal>
    )
}

export default RoleUpdate 