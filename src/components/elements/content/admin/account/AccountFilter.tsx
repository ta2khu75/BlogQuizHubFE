import ButtonSubmit from '@/components/common/ButtonSubmit'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AccountService from '@/services/AccountService'
import { AccountResponse } from '@/types/response/Account/AccountResponse'
import { handleMutation } from '@/util/mutation'
import ParseHelper from '@/util/ParseHelper'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
type Props = {
    roles: RoleResponse[],
    setAccountPage: React.Dispatch<React.SetStateAction<PageResponse<AccountResponse> | undefined>>
}

const AccountFilter = ({ roles, setAccountPage }: Props) => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const form = useForm<AccountSearch>()
    const onSubmit = (data: AccountSearch) => {
        router.push(`${pathname}?${createQueryString(data)}`)
    }
    const createQueryString = (search: Search) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('page')
        params.delete('size')
        Object.entries(search).forEach(([key, value]) => {
            if (value === undefined) {
                params.delete(key)
            }
            else if (Array.isArray(value)) {
                params.delete(key)
                value.forEach(val => params.append(key, val as string))
            }
            else {
                params.set(key, value as string)
            }
        })
        return params.toString()
    }
    const searchValues: AccountSearch = useMemo(() => ({
        keyword: searchParams.get("keyword") ?? undefined,
        role_id: ParseHelper.parseNumber(searchParams.get("role_id")),
        enabled: ParseHelper.parseBoolean(searchParams.get("enabled")),
        non_locked: ParseHelper.parseBoolean(searchParams.get("non_locked")),
        createdFrom: ParseHelper.parseDate(searchParams.get("createdFrom")),
        createdTo: ParseHelper.parseDate(searchParams.get("createdTo")),
        page: Number(searchParams.get("page")) || 1,
    }), [searchParams])
    const fetchAccountFilter = useCallback((searchValues: AccountSearch) => {
        handleMutation<AccountSearch, PageResponse<AccountResponse>>(searchValues, AccountService.search, res => {
            setAccountPage(res.data)
        })
    }, []);
    useEffect(() => {
        form.reset(searchValues)
        fetchAccountFilter(searchValues)
    }, [searchValues, fetchAccountFilter, form])
    const onReset = () => {
        router.push(`${pathname}`)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name='enabled' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Enabled</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={(value) => field.onChange(value === 'undefined' ? undefined : value === 'true')}
                                value={field.value === undefined ? 'undefined' : field.value.toString()}
                                className="flex flex-col space-y-1">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={`undefined`} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        All
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={'false'} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Not completed
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={'true'} />
                                    </FormControl>
                                    <FormLabel className="font-normal">Completed</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name='non_locked' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Non Locked</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={(value) => field.onChange(value === 'undefined' ? undefined : value === 'true')}
                                value={field.value === undefined ? 'undefined' : field.value.toString()}
                                className="flex flex-col space-y-1">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={`undefined`} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        All
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={'false'} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Not completed
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={'true'} />
                                    </FormControl>
                                    <FormLabel className="font-normal">Completed</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name='role_id' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                            <Select onValueChange={(value) => field.onChange(Number(value))} value={`${field.value}`}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {roles.map(role => (
                                        <SelectItem key={role.id} value={`${role.id}`}>{role.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                    </FormItem>
                )} />
                <ButtonSubmit onReset={onReset} isSubmitting={form.formState.isSubmitting} />
            </form>
        </Form >
    )
}

export default AccountFilter