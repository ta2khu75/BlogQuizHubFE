"use client"
import TitleContent from '@/components/common/TitleContent'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useAppDispatch } from '@/redux/hooks'
import { AuthActions } from '@/redux/slice/authSlide'
import { AuthRequest } from '@/types/request/AuthRequest'
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
    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', password: '' }
    })
    const onLogin = async (value: AuthRequest) => {
        try {
            await dispatch(AuthActions.fetchLogin(value)).unwrap();
            router.push('/')
        } catch (error) {
            const err = error as ApiResponse<object>;
            console.log(error);
            toast({ variant: 'destructive', title: 'Login failed', description: err.message })
        }
    };
    return (
        <div className='w-full mx-auto flex flex-col items-center'>
            <TitleContent className='mb-4'>Login</TitleContent>
            <div className='max-w-xl w-full mx-auto px-4'>
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className='flex justify-center'>
                            {form.formState.isSubmitting ?
                                <Button disabled>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </Button> :
                                <Button type='submit'>Submit</Button>
                            }
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage