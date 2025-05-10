import BooleanIcon from '@/components/common/BooleanIcon'
import TableElement, { Column } from '@/components/common/TableElement'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { AccountResponse } from '@/types/response/Account/AccountResponse'
import clsx from 'clsx'
import React, { useState } from 'react'
type Props = {
    array?: AccountResponse[]
    setAccount: React.Dispatch<React.SetStateAction<AccountResponse | undefined>>
}
const AccountTable = ({ array, setAccount }: Props) => {
    const [openRows, setOpenRows] = useState<Set<number | string>>(new Set());
    const toggleRow = (id: number | string) => {
        setOpenRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const columns: Column<AccountResponse>[] = [{
        key: "no",
        label: "No",
        render: (_, index) => {
            return index + 1
        },
    },
    {
        key: "profile",
        label: "Profile",
        render: (data) => {
            return (<Collapsible open={openRows.has(data.id)}>
                <CollapsibleTrigger>Display Name: {data.profile.display_name}</CollapsibleTrigger>
                <CollapsibleContent>
                    <p>Fist Name: {data.profile.first_name}</p>
                    <p>Last Name: {data.profile.last_name}</p>
                    <p>Birthday: {new Date(data.profile.birthday).toDateString()}</p>
                </CollapsibleContent>
            </Collapsible>)
        },
    },
    {
        key: "status",
        label: "Status",
        render: (data) => {
            return (
                <Collapsible open={openRows.has(data.id)}>
                    <CollapsibleTrigger>Role: {data.status.role.name}</CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className='flex'>Enabled: {<BooleanIcon value={data.status.enabled} />}</div>
                        <div className='flex'>Non Locked: {<BooleanIcon value={data.status.non_locked} />}</div>
                        <p>Updated At: {new Date(data.status.updated_at).toDateString()}</p>
                    </CollapsibleContent>
                </Collapsible>)
        }
    },
    {
        key: "createBy",
        label: "Create By",
        render(data) {
            return <>{data.createdBy}</>
        },
    },
    {
        key: "createdAt",
        label: "Created At",
        render(data) {
            return <>{data.createdAt && new Date(data.createdAt).toDateString()}</>
        },
    },
    {
        key: "updatedAt",
        label: "Updated At",
        name: "updatedAt",
    }, {
        key: "action",
        label: "Action",
        className: clsx("flex items-start"),
        render: (data) => {
            return (
                <div className='flex ite'>
                    <Button onClick={() => setAccount(data)}>Edit</Button>
                    <Button onClick={() => toggleRow(data.id)} >
                        {openRows.has(data.id) ? "Hide" : "View"}
                    </Button>
                </div>
            )
        }
    }]
    return (
        <TableElement<AccountResponse> array={array} columns={columns} />
    )
}

export default AccountTable