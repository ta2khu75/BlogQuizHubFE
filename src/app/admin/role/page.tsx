"use client"

import Confirm from "@/components/common/Confirm"
import Modal from "@/components/common/Modal"
import RoleCreate from "@/components/elements/content/admin/role/RoleCreate"
import RoleDelete from "@/components/elements/content/admin/role/RoleDelete"
import RoleTable from "@/components/elements/content/admin/role/RoleTable"
import RoleUpdate from "@/components/elements/content/admin/role/RoleUpdate"
import TitleElement from "@/components/elements/content/admin/TitleElement"
import PermissionGroupService from "@/services/PermissionGroupService"
import RoleService from "@/services/RoleService"
import { handleMutation } from "@/util/mutation"
import { useEffect, useState } from "react"

const RoleAdminPage = () => {
    const [roles, setRoles] = useState<RoleResponse[]>([])
    const [role, setRole] = useState<RoleResponse>()
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [permissionGroups, setPermissionGroups] = useState<PermissionGroupResponse[]>([])
    useEffect(() => {
        fetchAllRole()
        fetchAllPermissionGroup()
    }, [])
    const fetchAllRole = () => {
        handleMutation(undefined, RoleService.readAll, res => setRoles(res.data), err => console.log(err.data))
    }
    const fetchAllPermissionGroup = () => {
        handleMutation(undefined, PermissionGroupService.readAll, res => setPermissionGroups(res.data), err => console.log(err.data))
    }
    const handleEditClick = (role: RoleResponse) => {
        setRole(role)
        setOpenEdit(true)
    }
    const handleDeleteClick = (role: RoleResponse) => {
        setRole(role)
        setOpenDelete(true)
    }

    return (
        <>
            <div className="flex justify-between">
                <TitleElement>Role Manager</TitleElement>
                <RoleCreate setRoles={setRoles} permissionGroups={permissionGroups} />
            </div>
            {role && <RoleUpdate open={openEdit} setOpen={setOpenEdit} role={role} setRoles={setRoles} permissionGroups={permissionGroups} />}
            {role && <RoleDelete open={openDelete} setOpen={setOpenDelete} role={role} setRoles={setRoles} />}
            <RoleTable array={roles} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        </>
    )
}

export default RoleAdminPage