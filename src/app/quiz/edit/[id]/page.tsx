"use client"
import QuizForm from '@/components/form/quiz/QuizForm'
import { quizHooks } from '@/redux/api/quizApi'
import { quizCategoryHooks } from '@/redux/api/quizCategoryApi'
import { QuizRequest } from '@/types/request/QuizRequest'
import { handleMutation } from '@/util/mutation'
import { useRouter } from 'next/navigation'
import { use } from 'react'

const QuizEditPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)
    const router = useRouter()
    const [updateQuiz, { isLoading }] = quizHooks.useUpdateQuizMutation()
    const { data: quizData } = quizHooks.useReadQuizDetailQuery(id, { skip: !id })
    const { data: quizCategoriesData } = quizCategoryHooks.useReadAllQuizCategoryQuery()
    const quiz = quizData?.data
    const quizCategories = quizCategoriesData?.data || []
    const onSubmit = async (data: QuizRequest, image?: File) => {
        if (isLoading) return
        await handleMutation(() => updateQuiz({ image, data: { id, body: data } }).unwrap(), (res) => {
            router.push(`/profile?id=${res.data.author.id}&tab=quiz`)
        }, undefined, { error: "Update failed", success: "Update success" })
    }
    return (
        <QuizForm onSubmit={onSubmit} quizCategories={quizCategories} quiz={quiz} />
    )
}

export default QuizEditPage