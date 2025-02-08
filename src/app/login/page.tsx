"use client"
import Title from '@/components/elements/header/Title'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useAppDispatch } from '@/redux/hooks'
import { AuthActions } from '@/redux/slice/authSlide'
import AuthService from '@/services/AuthService'
import { AuthRequest } from '@/types/request/AuthRequest'
import FunctionUtil from '@/util/FunctionUtil'
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'
const formSchema: ZodType<AuthRequest> = z.object({
    email: z.string().email(),
    password: z.string().min(3)
})
const LoginPage = () => {
    const { toast } = useToast()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', password: '' }
    })
    const router = useRouter()
    const dispatch = useAppDispatch()
    const onLogin = async (value: AuthRequest) => {
        try {
            const response = await AuthService.login(value);
            if (response.success) {
                dispatch(AuthActions.set(response.data));
                router.push('/');
                toast({ title: "Login successful" })
            } else {
                toast({ title: "Login failed", description: response.message_error, variant: "destructive" });
            }
        } catch (err) {
            toast({ title: "Login failed", description: FunctionUtil.showError(err), variant: "destructive" });
        }
    };
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className="w-full max-w-md p-4 pt-2 bg-white rounded-lg shadow-md">
                <Title title='Login' />
                <Button onClick={() => dispatch(AuthActions.reset())}>reset</Button>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onLogin)} className='space-y-4'>
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
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        {form.formState.isSubmitting ?
                            <Button disabled>
                                <Loader2 className="animate-spin" />
                                Please wait
                            </Button> :
                            <Button type='submit'>Submit</Button>
                        }
                    </form>
                </Form>
            </div>
        </div >
    )
}

export default LoginPage