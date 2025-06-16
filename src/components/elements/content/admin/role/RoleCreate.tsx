import Modal from '@/components/common/Modal'
import RoleForm from '@/components/form/RoleForm'
import { Button } from '@/components/ui/button'
import { roleHooks } from '@/redux/api/roleApi'
import { RoleRequest } from '@/types/request/RoleRequest'
import { PermissionGroupResponse } from '@/types/response/PermissionGroupResponse'
import { handleMutation } from '@/util/mutation'
import React, { useState } from 'react'
type Props = {
    permissionGroups: PermissionGroupResponse[]
}
const RoleCreate = ({ permissionGroups }: Props) => {
    const [createRole, { isLoading }] = roleHooks.useCreateRoleMutation()
    const [open, setOpen] = useState(false)
    const onSubmit = async (value: RoleRequest) => {
        console.log(value);

        if (isLoading) return
        await handleMutation<RoleResponse>(
            () => createRole(value).unwrap(),
            () => {
                setOpen(false)
            }, undefined,
            { success: 'Create success', error: 'Create failed' })
    }
    return (
        <>
            <Button onClick={() => setOpen(true)}>Create</Button>
            <Modal open={open} setOpen={setOpen} title="Create Account">
                <RoleForm permissionGroups={permissionGroups} onSubmit={onSubmit} />
            </Modal>
        </>
    )
}

export default RoleCreate 