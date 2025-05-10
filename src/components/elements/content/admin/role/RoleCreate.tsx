import Modal from '@/components/common/Modal'
import RoleForm from '@/components/form/RoleForm'
import { Button } from '@/components/ui/button'
import RoleService from '@/services/RoleService'
import { RoleRequest } from '@/types/request/RoleRequest'
import { handleMutation } from '@/util/mutation'
import StateHelpers from '@/util/StateHelpers'
import React, { Dispatch, SetStateAction, useState } from 'react'
type Props = {
    setRoles: Dispatch<SetStateAction<RoleResponse[]>>,
    permissionGroups: PermissionGroupResponse[]
}
const RoleCreate = ({ setRoles, permissionGroups }: Props) => {
    const [open, setOpen] = useState(false)
    const onSubmit = (value: RoleRequest) => {
        console.log(value);

        handleMutation<RoleRequest, RoleResponse>(value,
            (val) => RoleService.create(val),
            (response) => {
                setOpen(false)
                StateHelpers.prependState<RoleResponse>(setRoles, response.data)
            }, undefined,
            { success: 'Create success', error: 'Create failed' })
    }
    return (
        <>
            <Button onClick={() => setOpen(true)}>Create</Button>
            <Modal open={open} onCancel={() => setOpen(false)} title="Create Account">
                <RoleForm permissionGroups={permissionGroups} onSubmit={onSubmit} />
            </Modal>
        </>
    )
}

export default RoleCreate 