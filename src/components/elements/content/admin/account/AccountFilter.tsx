import ButtonSubmit from '@/components/common/ButtonSubmit'
import { DatePicker } from '@/components/common/DatePicker'
import Selection from '@/components/common/Selection'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { accountHooks } from '@/redux/api/accountApi'
import { AccountSearch } from '@/types/request/search/AccountSearch'
import { Search } from '@/types/request/search/Search'
import { AccountResponse } from '@/types/response/Account/AccountResponse'
import { PageResponse } from '@/types/response/PageResponse'
import ParseHelper from '@/util/ParseHelper'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
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
    const searchValues: AccountSearch = useMemo(() => ({
        keyword: ParseHelper.parseString(searchParams.get("keyword")),
        role_id: ParseHelper.parseNumber(searchParams.get("role_id")),
        enabled: ParseHelper.parseBoolean(searchParams.get("enabled")),
        non_locked: ParseHelper.parseBoolean(searchParams.get("non_locked")),
        createdFrom: ParseHelper.parseDate(searchParams.get("createdFrom")),
        createdTo: ParseHelper.parseDate(searchParams.get("createdTo")),
        page: Number(searchParams.get("page")),
    }), [searchParams])
    const { data } = accountHooks.useSearchAccountQuery(searchValues);
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
    useEffect(() => {
        form.reset(searchValues)
        if (data) {
            setAccountPage(data.data)
        }
    }, [searchValues, data, form])
    const onReset = () => {
        router.push(`${pathname}`)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name='keyword' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Keyword</FormLabel>
                        <FormControl>
                            <div className="flex w-full max-w-sm items-center gap-2">
                                <Input placeholder='Keyword' {...field} />
                                <Button type="submit">
                                    Search
                                </Button>
                            </div>
                        </FormControl>
                    </FormItem>
                )} />
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
                                        False
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={'true'} />
                                    </FormControl>
                                    <FormLabel className="font-normal">True</FormLabel>
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
                                        True
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={'true'} />
                                    </FormControl>
                                    <FormLabel className="font-normal">False</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name='role_id' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                            <Selection options={roles.map(role => ({ value: role.id, label: role.name }))} {...field} />
                        </FormControl>
                    </FormItem>
                )} />
                <div>
                    <Label className="text-base">Created date range</Label>
                    <div className='grid grid-cols-2 gap-4'>
                        <FormField control={form.control} name='createdFrom' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Created From</FormLabel>
                                <FormControl>
                                    {/* <Input type='number' placeholder="Min"
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                            /> */}
                                    <DatePicker value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='createdTo' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Created To</FormLabel>
                                <FormControl>
                                    <DatePicker value={field.value} onChange={field.onChange} />
                                    {/* <Input type='number' placeholder="Max"
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                            /> */}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </div>
                <ButtonSubmit onReset={onReset} isSubmitting={form.formState.isSubmitting} />
            </form>
        </Form >
    )
}

export default AccountFilter