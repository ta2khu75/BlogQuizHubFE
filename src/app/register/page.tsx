"use client"
import TitleContent from '@/components/common/TitleContent'
import AccountForm from '@/components/form/AccountForm'
import { useRegisterMutation } from '@/redux/api/authApi'
import { AccountRequest } from '@/types/request/account/AccountRequest'
import { handleMutation } from '@/util/mutation'
import { useRouter } from 'next/navigation'
const RegisterPage = () => {
    const [register, { isLoading }] = useRegisterMutation()
    const router = useRouter()
    const onRegister = async (value: AccountRequest) => {
        if (isLoading) return; // Prevent multiple submissions
        await handleMutation(() => register(value).unwrap(), () => {
            router.push('/login')
        }, undefined, { success: "Register successful", error: "Register failed" });
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