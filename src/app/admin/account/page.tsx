
"use client"
import Paginator from "@/components/common/Paginator";
import TitleContent from "@/components/common/TitleContent";
import AccountCreate from "@/components/elements/content/admin/account/AccountCreate";
import AccountFilter from "@/components/elements/content/admin/account/AccountFilter";
import AccountStatusUpdate from "@/components/elements/content/admin/account/AccountStatusUpdate";
import AccountTable from "@/components/elements/content/admin/account/AccountTable";
import { useToast } from "@/hooks/use-toast";
import RoleService from "@/services/RoleService";
import { AccountResponse } from "@/types/response/Account/AccountResponse";
import { useEffect, useState } from "react";

const AccountPage = () => {
    const { toast } = useToast()
    const [accountPage, setAccountPage] = useState<PageResponse<AccountResponse>>();
    const [account, setAccount] = useState<AccountResponse>();
    const [roles, setRoles] = useState<RoleResponse[]>([])
    const [openEdit, setOpenEdit] = useState(false);
    useEffect(() => {
        fetchRoleList()
    }, [])

    const fetchRoleList = () => {
        RoleService.readAll().then(res => {
            setRoles(res.data)
        }).catch(err => toast(err))
    }
    useEffect(() => {
        if (account) {
            setOpenEdit(true)
        } else {
            setOpenEdit(false)
        }
    }, [account])
    return (
        <>
            <div className="flex justify-between">
                <TitleContent>Accounts Manager</TitleContent>
                <AccountCreate roles={roles} />
            </div>
            {account && <AccountStatusUpdate account={account} open={openEdit} setOpen={(value) => {
                if (!value) {
                    setAccount(undefined)
                }
            }} roles={roles} />}
            <div className="flex">
                <AccountFilter setAccountPage={setAccountPage} roles={roles} />
                <div>
                    <AccountTable setAccount={setAccount} array={accountPage?.content} />
                    <Paginator page={accountPage} />
                </div>
            </div>
        </>
    )
}

export default AccountPage