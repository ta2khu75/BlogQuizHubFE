"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z, ZodType } from "zod"

type Props = {
    roles: RoleResponse[],
    account: ManagedAccountResponse,
    onSubmit: (value: AccountStatusRequest) => void
}
const formSchema: ZodType<AccountStatusRequest> = z.object({
    enabled: z.boolean(),
    non_locked: z.boolean(),
    role_id: z.number()
})
const AccountStatusForm = ({ account, onSubmit, roles }: Props) => {
    const form = useForm<AccountStatusRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            enabled: account?.enabled ?? false,
            non_locked: account?.non_locked ?? false,
            role_id: account?.role?.id ?? 0
        }
    })
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
                </div>
                <FormField control={form.control} name='role_id' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={`${field.value}`}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role for account" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {roles.map(role => <SelectItem className={cn("hover:bg-slate-100", field.value === role.id ? "bg-slate-200" : "")} key={role.id} value={`${role.id}`}>{role.name}</SelectItem>)}
                            </SelectContent>
                            <FormMessage />
                        </Select>
                    </FormItem>
                )} />
                {form.formState.isSubmitting ?
                    <Button disabled>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </Button> :
                    <Button type='submit'>Submit</Button>}
            </form>
        </Form >
    )
}

export default AccountStatusForm