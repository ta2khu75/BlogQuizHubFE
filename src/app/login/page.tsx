"use client"
import TitleContent from '@/components/common/TitleContent'
import AuthForm from '@/components/form/AuthForm'
import { useToast } from '@/hooks/use-toast'
import { useAppDispatch } from '@/redux/hooks'
import { AuthActions } from '@/redux/slice/authSlide'
import { AuthRequest } from '@/types/request/AuthRequest'
import { useRouter } from 'next/navigation'
const LoginPage = () => {
    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const router = useRouter()
    const onSubmit = async (value: AuthRequest) => {
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
                <AuthForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}

export default LoginPage