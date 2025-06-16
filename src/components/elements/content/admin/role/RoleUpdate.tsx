import Modal from '@/components/common/Modal'
import RoleForm from '@/components/form/RoleForm'
import { roleHooks } from '@/redux/api/roleApi'
import { RoleRequest } from '@/types/request/RoleRequest'
import { PermissionGroupResponse } from '@/types/response/PermissionGroupResponse'
import { handleMutation } from '@/util/mutation'
import React, { Dispatch, SetStateAction } from 'react'
type Props = {
    permissionGroups: PermissionGroupResponse[]
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    role: RoleResponse,
}
const RoleUpdate = ({ role, permissionGroups, open, setOpen }: Props) => {
    const [update, { isLoading }] = roleHooks.useUpdateRoleMutation()
    const onSubmit = async (value: RoleRequest) => {
        if (isLoading) return
        await handleMutation<RoleResponse>(
            () => update({ id: role.id, body: value }),
            () => {
                setOpen(false)
            },
            undefined,
            { success: 'Update success', error: 'Update failed' }
        )
    }
    return (
        <Modal open={open} setOpen={setOpen} title="Update Account Status">
            <RoleForm
                permissionGroups={permissionGroups}
                onSubmit={onSubmit}
                role={role}
            />
        </Modal>
    )
}

export default RoleUpdate 