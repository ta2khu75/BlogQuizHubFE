import ButtonSubmit from '@/components/common/ButtonSubmit'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthRequest, authSchema } from '@/types/request/AuthRequest'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
type Props = {
    onSubmit: (value: AuthRequest) => void
}
const AuthForm = ({ onSubmit }: Props) => {
    const form = useForm({
        resolver: zodResolver(authSchema),
        defaultValues: { email: '', password: '' }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField control={form.control} name='email' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="example@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name='password' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type='password' placeholder="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <ButtonSubmit isSubmitting={form.formState.isSubmitting} />
                {/* <div className='flex justify-center'>
                    {form.formState.isSubmitting ?
                        <Button disabled>
                            <Loader2 className="animate-spin" />
                            Please wait
                        </Button> :
                        <Button type='submit'>Submit</Button>
                    }
                </div> */}
            </form>
        </Form>
    )
}

export default AuthForm; 