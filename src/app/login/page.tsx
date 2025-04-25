"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
            if (response.status_code < 400) {
                dispatch(AuthActions.set(response.data));
                router.push('/');
                toast({ title: "Login successful" })
            } else {
                toast({ title: "Login failed", description: response.message, variant: "destructive" });
            }
        } catch (err) {
            toast({ title: "Login failed", description: FunctionUtil.showError(err), variant: "destructive" });
        }
    };
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
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
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <CardFooter className="flex justify-end">
                            {form.formState.isSubmitting ?
                                <Button disabled>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </Button> :
                                <Button type='submit'>Submit</Button>
                            }
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default LoginPage