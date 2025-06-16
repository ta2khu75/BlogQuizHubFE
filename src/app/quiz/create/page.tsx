"use client"
import TitleContent from '@/components/common/TitleContent'
import QuizForm from '@/components/form/quiz/QuizForm'
import { useToast } from '@/hooks/use-toast'
import { quizHooks } from '@/redux/api/quizApi'
import { quizCategoryHooks } from '@/redux/api/quizCategoryApi'
import { QuizRequest } from '@/types/request/QuizRequest'
import { handleMutation } from '@/util/mutation'
import { useRouter } from 'next/navigation'
import React from 'react'

const QuizCreatePage = () => {
    const { data: quizCategoriesData } = quizCategoryHooks.useReadAllQuizCategoryQuery();
    const [createQuiz, { isLoading }] = quizHooks.useCreateQuizMutation()
    const quizCategories = quizCategoriesData?.data || []
    const { toast } = useToast()
    const router = useRouter()
    const onSubmit = async (data: QuizRequest, image?: File) => {
        if (!image) {
            toast({ variant: "destructive", description: "Image is required" })
            return;
        }
        if (isLoading) return
        await handleMutation(() => createQuiz({ image, body: data }).unwrap(), (res) => {
            router.push(`/profile?id=${res.data.author.id}&tab=quiz`)
        }, undefined, { error: "Create failed", success: "Create success" })
    }
    return (
        <>
            <TitleContent className='text-center mb-8'>Create Quiz</TitleContent>
            <QuizForm onSubmit={onSubmit} quizCategories={quizCategories} />
        </>
    )
}

export default QuizCreatePage