"use client"
import ButtonSubmit from "@/components/common/ButtonSubmit"
import Selection from "@/components/common/Selection"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AccountStatusRequest, accountStatusRequestSchema } from "@/types/request/account/AccountStatusRequest"
import { AccountResponse } from "@/types/response/Account/AccountResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

type Props = {
    roles: RoleResponse[],
    account: AccountResponse,
    onSubmit: (value: AccountStatusRequest) => void
}
const AccountStatusForm = ({ account, onSubmit, roles }: Props) => {
    const defaultValues: AccountStatusRequest = { enabled: false, non_locked: false, role_id: 0 }
    const form = useForm<AccountStatusRequest>({
        resolver: zodResolver(accountStatusRequestSchema),
        defaultValues: defaultValues
    })
    const load = () => {
        form.reset({ ...account.status, role_id: account.status.role.id })
    }
    useEffect(() => {
        if (account) load();
    }, [account])
    const onReset = () => {
        if (account) load()
        else
            form.reset(defaultValues)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <FormField control={form.control} name='enabled' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enable</FormLabel>
                            <FormControl>
                                <RadioGroup defaultValue={field.value ? "true" : "false"} onValueChange={(value) => field.onChange("true" === value)}>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="true" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            True
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="false" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            False
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='non_locked' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Non locked</FormLabel>
                            <FormControl>
                                <RadioGroup value={field.value ? "true" : "false"} onValueChange={(value) => field.onChange("true" === value)}>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="true" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            True
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="false" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            False
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <FormField control={form.control} name='role_id' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Selection options={roles.map(role => ({ label: role.name, value: role.id }))} onChange={(value) => field.onChange(value)} value={field.value} placeholder="Select a role for account" className="w-full" />
                    </FormItem>
                )} />
                <ButtonSubmit onReset={onReset} isSubmitting={form.formState.isSubmitting} />
            </form>
        </Form >
    )
}

export default AccountStatusForm