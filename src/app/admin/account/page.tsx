
"use client"
import Paginator from "@/components/common/Paginator";
import TitleContent from "@/components/common/TitleContent";
import AccountCreate from "@/components/elements/content/admin/account/AccountCreate";
import AccountFilter from "@/components/elements/content/admin/account/AccountFilter";
import AccountStatusUpdate from "@/components/elements/content/admin/account/AccountStatusUpdate";
import AccountTable from "@/components/elements/content/admin/account/AccountTable";
import { roleHooks } from "@/redux/api/roleApi";
import { apiSlice } from "@/redux/apiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { AccountResponse } from "@/types/response/Account/AccountResponse";
import { PageResponse } from "@/types/response/PageResponse";
import { useEffect, useState } from "react";

const AccountPage = () => {
    const [accountPage, setAccountPage] = useState<PageResponse<AccountResponse>>();
    const [account, setAccount] = useState<AccountResponse>();
    const { data } = roleHooks.useReadAllRoleQuery()
    const roles = data?.data ?? []
    const dispatch = useAppDispatch();
    const [openEdit, setOpenEdit] = useState(false);
    useEffect(() => {
        dispatch(apiSlice.util.resetApiState());
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