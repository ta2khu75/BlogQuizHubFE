"use client"
import TitleContent from '@/components/common/TitleContent'
import AuthForm from '@/components/form/AuthForm'
import { useLoginMutation } from '@/redux/api/authApi'
import { AuthRequest } from '@/types/request/AuthRequest'
import { handleMutation } from '@/util/mutation'
import { useRouter } from 'next/navigation'
const LoginPage = () => {
    const [login, { isLoading }] = useLoginMutation()
    const router = useRouter()
    const onSubmit = async (value: AuthRequest) => {
        if (isLoading) return; // Prevent multiple submissions
        await handleMutation(() => login(value).unwrap(), () => {
            router.push('/');
        }, undefined, { success: "Login successful", error: "Login failed" })
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