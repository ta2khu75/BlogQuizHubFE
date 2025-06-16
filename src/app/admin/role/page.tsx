"use client"

import RoleCreate from "@/components/elements/content/admin/role/RoleCreate"
import RoleDelete from "@/components/elements/content/admin/role/RoleDelete"
import RoleTable from "@/components/elements/content/admin/role/RoleTable"
import RoleUpdate from "@/components/elements/content/admin/role/RoleUpdate"
import TitleElement from "@/components/elements/content/admin/TitleElement"
import { permissionGroupHooks } from "@/redux/api/permissionGroupApi"
import { roleHooks } from "@/redux/api/roleApi"
import { useState } from "react"

const RoleAdminPage = () => {
    const { data: roleData } = roleHooks.useReadAllRoleQuery()
    const { data: permissionGroupData } = permissionGroupHooks.useReadAllPermissionGroupQuery()
    const permissionGroups = permissionGroupData?.data ?? [];
    const roles = roleData?.data ?? []
    const [role, setRole] = useState<RoleResponse>()
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
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
                <RoleCreate permissionGroups={permissionGroups} />
            </div>
            {role && <RoleUpdate open={openEdit} setOpen={setOpenEdit} role={role} permissionGroups={permissionGroups} />}
            {role && <RoleDelete open={openDelete} setOpen={setOpenDelete} role={role} />}
            <RoleTable array={roles} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        </>
    )
}

export default RoleAdminPage