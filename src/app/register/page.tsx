"use client"
import AccountForm from '@/components/form/AccountForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import AuthService from '@/services/AuthService'
import FunctionUtil from '@/util/FunctionUtil'
import { useRouter } from 'next/navigation'
const RegisterPage = () => {
    const { toast } = useToast()
    const router = useRouter()
    const onRegister = async (value: AccountRequest) => {
        try {
            const response = await AuthService.register(value);
            if (response.success) {
                router.push('/login')
                toast({ title: "Register successful" })
            } else {
                toast({ title: "Register failed", description: response.message_error, variant: "destructive" });
            }
        } catch (err) {
            toast({ title: "Register failed", description: FunctionUtil.showError(err), variant: "destructive" })
        }
    }
    return (

        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
                <AccountForm onSubmit={onRegister} />
            </CardContent>
        </Card>
        // <div className='flex items-center justify-center min-h-screen'>
        //     <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        //         <Title title='Register' />
        //         <AccountForm onSubmit={onRegister} />
        //     </div>
        // </div>
    )
}

export default RegisterPage