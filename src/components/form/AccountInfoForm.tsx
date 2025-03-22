
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z, ZodType } from "zod"

const formSchema: ZodType<AccountInfoRequest> = z.object({
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    birthday: z.string().nonempty(),
    username: z.string().min(3),
})
type Props = {
    onSubmit: (value: AccountInfoRequest) => void
    account?: AccountResponse
}
const AccountInfoForm = ({ onSubmit, account }: Props) => {
    const form = useForm<AccountInfoRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: { first_name: '', last_name: '', birthday: new Date().toISOString().split('T')[0], username: '' }
    })
    useEffect(() => {
        if (account) {
            form.reset(account)
        }
    }, [account])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField control={form.control} name='username' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name='first_name' render={({ field }) => (
                    <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                            <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name='last_name' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                            <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <FormControl>
                                <Input type='date' placeholder='Birthday' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    {form.formState.isSubmitting ? <Button disabled>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </Button> :
                        <Button type='submit'>Submit</Button>}
                </div>
            </form>
        </Form>
    )
}

export default AccountInfoForm 