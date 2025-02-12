"use client"

import TitleElement from "@/components/elements/content/admin/TitleElement"
import TableElement from "@/components/elements/content/TableElement"
import Confirm from "@/components/elements/util/Confirm"
import Modal from "@/components/elements/util/Modal"
import RoleForm from "@/components/form/RoleForm"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import PermissionGroupService from "@/services/PermissionGroupService"
import RoleService from "@/services/RoleService"
import FunctionUtil from "@/util/FunctionUtil"
import { useEffect, useState } from "react"

const RoleAdminPage = () => {
    const { toast } = useToast()
    const [roles, setRoles] = useState<RoleDetailResponse[]>([])
    const [role, setRole] = useState<RoleDetailResponse>()
    const [open, setOpen] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [permissionGroups, setPermissionGroups] = useState<PermissionGroupResponse[]>([])
    useEffect(() => {
        fetchAllRole()
        fetchAllPermissionGroup()
    }, [])
    const fetchAllRole = () => {
        RoleService.readAll().then(res => {
            if (res.success) {
                setRoles(res.data)
            } else {
                toast({ description: res.message_error, variant: "destructive" })
            }
        }).catch(err => toast({ description: FunctionUtil.showError(err), variant: "destructive" }))
    }
    const fetchAllPermissionGroup = () => {
        PermissionGroupService.readAll().then(res => {
            if (res.success) {
                setPermissionGroups(res.data)
            } else {
                toast({ description: res.message_error, variant: "destructive" })
            }
        }).catch(err => toast({ description: FunctionUtil.showError(err), variant: "destructive" }))
    }
    const handleEditClick = (role: RoleDetailResponse) => {
        setRole(role)
        setOpen(true)
    }
    const handleDeleteClick = (role: RoleDetailResponse) => {
        setRole(role)
        setOpenConfirm(true)
    }

    const onSubmit = async (value: RoleRequest) => {
        console.log(value);
        if (role) {
            update(role.id, value)
        } else {
            create(value)
        }
    }
    const update = async (id: number, role: RoleRequest) => {
        try {
            const response = await RoleService.update(id, role)
            if (response.success) {
                setRoles(roles.map(role => {
                    if (role.id === response.data.id) return response.data
                    return role;
                }))
                toast({ title: 'Update successful' })
                onCancel();
            }
            else {
                toast({ title: "Update failed", description: response.message_error, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Update failed", description: FunctionUtil.showError(error), variant: "destructive" })
        }
    }
    const create = async (role: RoleRequest) => {
        try {
            const response = await RoleService.create(role)
            if (response.success) {
                setRoles([response.data, ...roles])
                toast({ title: 'Create success' })
                onCancel();
            }
            else {
                toast({ title: "Create failed", description: response.message_error, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Create failed", description: FunctionUtil.showError(error), variant: "destructive" })
        }
    }
    const onDelete = () => {
        if (role)
            RoleService.delete(role?.id).then(response => {
                if (response.success) {
                    setRoles(roles.filter(item => item.id !== role.id))
                    toast({ title: "Delete successful" })
                    onCancel();
                } else {
                    toast({ title: "Delete failed", description: response.message_error, variant: "destructive" })
                }
            }).catch(err => toast({ title: "Delete failed", description: FunctionUtil.showError(err), variant: "destructive" }))
    }
    const onCancel = () => {
        setOpen(false)
        setOpenConfirm(false)
        setRole(undefined)
    }
    return (
        <>
            <div className="flex justify-between">
                <TitleElement>Role Manager</TitleElement>
                <Button onClick={() => setOpen(true)}>Create</Button>
            </div>
            <Modal open={open} onCancel={onCancel} title={role ? `Edit role ${role.name}` : "Create role"} className="lg:max-w-[1200] md:max-w-[800px]">
                <RoleForm onSubmit={onSubmit} permissionGroups={permissionGroups} role={role} />
            </Modal>
            <Confirm open={openConfirm} title={`Are you want delete role ${role?.name} ?`} onCancel={onCancel} onContinue={onDelete} />
            <TableElement<RoleDetailResponse> showIndex handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} visibleColumns={["name"]} array={roles} />
        </>
    )
}

export default RoleAdminPage