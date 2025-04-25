"use client"

import TitleElement from "@/components/elements/content/admin/TitleElement";
import TableElement from "@/components/elements/content/TableElement";
import Modal from "@/components/elements/util/Modal";
import AccountForm from "@/components/form/AccountForm";
import AccountStatusForm from "@/components/form/AccountStatusForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AccountService from "@/services/AccountService";
import RoleService from "@/services/RoleService";
import FunctionUtil from "@/util/FunctionUtil";
import { useEffect, useState } from "react";

const AccountPage = () => {
    const { toast } = useToast()
    const [accountPage, setAccountPage] = useState<PageResponse<ManagedAccountResponse>>();
    const [account, setAccount] = useState<ManagedAccountResponse>();
    const [roles, setRoles] = useState<RoleResponse[]>([])
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    useEffect(() => {
        fetchAccountPage()
        fetchRoleList()
    }, [])

    const fetchRoleList = () => {
        RoleService.readAll().then(res => {
            if (res.success) {
                setRoles(res.data)
            } else {
                toast({ description: res.message_error, variant: "destructive" })
            }
        }).catch(err => toast(err))
    }
    const fetchAccountPage = () => {
        AccountService.readPage().then(response => {
            if (response.success) {
                setAccountPage(response.data)
            }
        }).catch(err => console.log(err))
    }
    const handleEditClick = (account: ManagedAccountResponse) => {
        setOpenEdit(true)
        setAccount(account)
    }
    const onCreate = async (value: AccountRequest) => {
        try {
            const response = await AccountService.create(value)
            if (response.success) {
                toast({ title: 'Create success' })
                setOpenCreate(false)
                fetchAccountPage();
            } else {
                toast({ title: "Create failed", description: response.message_error, variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Create failed", description: FunctionUtil.showError(error), variant: "destructive" })
        }
    }
    const onUpdate = async (value: AccountStatusRequest) => {
        if (account) {
            try {
                const response = await AccountService.updateStatus(account?.info.id, value)
                if (response.success) {
                    toast({ title: 'Update success' })
                    setOpenEdit(false)
                    const updatedAccounts = accountPage?.content.map((account) => {
                        if (account.info.id === response.data.info.id) {
                            return response.data
                        } return account;
                    })
                    setAccountPage((prev) => {
                        if (!prev) return prev;
                        return { ...prev, content: updatedAccounts || [] };
                    });
                } else {
                    toast({ title: "Update failed", description: response.message_error, variant: "destructive" });
                }
            } catch (error) {
                toast({ title: "Update failed", description: FunctionUtil.showError(error), variant: "destructive" })
            }
        }
    }
    const onCancelCreate = () => {
        setOpenCreate(false)
    }
    const onCancelEdit = () => {
        setOpenEdit(false)
        setAccount(undefined)
    }
    return (
        <>
            <div className="flex justify-between">
                <TitleElement>Account Manager</TitleElement>
                <Button onClick={() => setOpenCreate(true)}>Create</Button>
            </div>
            <Modal open={openCreate} onCancel={onCancelCreate} title={"Create account"} description="Create new account here. Click submit when you are done.">
                <AccountForm onSubmit={onCreate} />
            </Modal>
            <Modal open={openEdit} onCancel={onCancelEdit} title={"Edit account status"} description="Edit account status here. Click submit when you are done.">
                {account && <AccountStatusForm account={account} roles={roles} onSubmit={onUpdate} />}
            </Modal>
            <TableElement<AccountResponse> handleEditClick={handleEditClick} showIndex visibleColumns={["", "username", "birthday", "enabled", "non_locked", "role"]} array={accountPage?.content ?? []} />
        </>
    )
}

export default AccountPage