"use client"
import TitleContent from '@/components/common/TitleContent'
import AccountForm from '@/components/form/AccountForm'
import { useToast } from '@/hooks/use-toast'
import AuthService from '@/services/AuthService'
import { useRouter } from 'next/navigation'
const RegisterPage = () => {
    const { toast } = useToast()
    const router = useRouter()
    const onRegister = async (value: AccountRequest) => {
        try {
            await AuthService.register(value);
            router.push('/login')
            toast({ title: "Register successful" })
        } catch (err) {
            const error = err as ApiResponse<object>;
            toast({ title: "Register failed", description: error.message, variant: "destructive" })
        }
    }
    return (
        <div className='w-full mx-auto flex flex-col items-center'>
            <TitleContent className='mb-4'>Register</TitleContent>
            <div className='max-w-xl w-full mx-auto px-4'>
                <AccountForm onSubmit={onRegister} />
            </div>
        </div>
    )
}

export default RegisterPage