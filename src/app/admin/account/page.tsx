
"use client"
import Modal from "@/components/common/Modal";
import TitleContent from "@/components/common/TitleContent";
import AccountCreate from "@/components/elements/content/admin/account/AccountCreate";
import TableElement from "@/components/elements/content/report/TableElement";
import AccountForm from "@/components/form/AccountForm";
import AccountStatusForm from "@/components/form/AccountStatusForm";
import { useToast } from "@/hooks/use-toast";
import AccountService from "@/services/AccountService";
import RoleService from "@/services/RoleService";
import { AccountRequest } from "@/types/request/account/AccountRequest";
import { AccountStatusRequest } from "@/types/request/account/AccountStatusRequest";
import { useEffect, useState } from "react";

const AccountPage = () => {
    const { toast } = useToast()
    const [accountPage, setAccountPage] = useState<PageResponse<AccountResponse>>();
    const [account, setAccount] = useState<AccountResponse>();
    const [roles, setRoles] = useState<RoleResponse[]>([])
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    useEffect(() => {
        fetchAccountPage()
        fetchRoleList()
    }, [])

    const fetchRoleList = () => {
        RoleService.readAll().then(res => {
            setRoles(res.data)
        }).catch(err => toast(err))
    }
    const fetchAccountPage = () => {
        AccountService.readPage().then(response => {
            setAccountPage(response.data)
        }).catch(err => console.log(err))
    }
    const handleEditClick = (account: AccountResponse) => {
        setOpenEdit(true)
        setAccount(account)
    }
    const onCreate = async (value: AccountRequest) => {
        try {
            const response = await AccountService.create(value)
            toast({ title: 'Create success' })
            setOpenCreate(false)
            setAccountPage((prev) => {
                if (!prev) return prev;
                return { ...prev, content: [response.data, ...(prev.content || [])] };
            });
        } catch (error) {
            const err = error as ApiResponse<object>;
            toast({ title: "Create failed", description: err.message, variant: "destructive" })
        }
    }
    const onUpdate = async (value: AccountStatusRequest) => {
        if (account) {
            try {
                const response = await AccountService.updateStatus(account?.info.id, value)
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
            } catch (error) {
                const err = error as ApiResponse<object>;
                toast({ title: "Update failed", description: err.message, variant: "destructive" })
            }
        }
    }
    const onCancelEdit = () => {
        setOpenEdit(false)
        setAccount(undefined)
    }
    return (
        <>
            <div className="flex justify-between">
                <TitleContent>Accounts Manager</TitleContent>
                <AccountCreate setAccountPage={setAccountPage} roles={roles} />
            </div>
            <Modal open={openEdit} onCancel={onCancelEdit} title={"Edit account status"} description="Edit account status here. Click submit when you are done.">
                {account && <AccountStatusForm account={account} roles={roles} onSubmit={onUpdate} />}
            </Modal>
            {/* <TableElement array={accountPage?.content} columns={[{}]} /> */}
        </>
    )
}

export default AccountPage