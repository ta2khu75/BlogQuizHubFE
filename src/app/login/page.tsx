"use client"
import TitleContent from '@/components/common/TitleContent'
import AuthForm from '@/components/form/AuthForm'
import { useAppDispatch } from '@/redux/hooks'
import { AuthActions } from '@/redux/slice/authSlice'
import AuthService from '@/services/AuthService'
import { AuthRequest } from '@/types/request/AuthRequest'
import { handleMutation } from '@/util/mutation'
import { useRouter } from 'next/navigation'
const LoginPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const onSubmit = async (value: AuthRequest) => {
        await handleMutation(() => AuthService.login(value), (res) => {
            dispatch(AuthActions.set(res.data))
            router.push('/')
        }, undefined, { success: 'Login success', error: 'Login failed' })
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