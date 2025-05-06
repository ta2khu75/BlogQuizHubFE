import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AccountPasswordRequest, accountPasswordSchema, } from "@/types/request/account/AccountPasswordRequest"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
type Props = {
    onSubmit: (value: AccountPasswordRequest) => void
}
const AccountPasswordForm = ({ onSubmit }: Props) => {
    const form = useForm<AccountPasswordRequest>({
        resolver: zodResolver(accountPasswordSchema),
        defaultValues: { password: '', new_password: '', confirm_password: '' }
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField control={form.control} name='password' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type='password' placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name='new_password' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="New password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name='confirm_password' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Confirm password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
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

export default AccountPasswordForm 