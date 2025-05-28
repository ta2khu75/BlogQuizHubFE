"use client"
import TitleContent from '@/components/common/TitleContent'
import QuizForm from '@/components/form/quiz/QuizForm'
// import QuizForm from '@/components/form/QuizForm'
import { useToast } from '@/hooks/use-toast'
import QuizCategoryService from '@/services/QuizCategoryService'
import QuizService from '@/services/QuizService'
import { QuizRequest } from '@/types/request/QuizRequest'
import { handleMutation } from '@/util/mutation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const QuizCreatePage = () => {
    const { toast } = useToast()
    const router = useRouter()
    const [quizCategories, setQuizCategories] = useState<QuizCategoryResponse[]>([]);
    useEffect(() => {
        fetchQuizCategoryList()
    }, [])

    const fetchQuizCategoryList = () => {
        QuizCategoryService.readAll().then(res => {
            setQuizCategories(res.data)
        }).catch(err =>
            toast({ variant: "destructive", description: err.message }))
    }
    const onSubmit = async (data: QuizRequest, image?: File) => {
        if (!image) {
            toast({ variant: "destructive", description: "Image is required" })
            return;
        }
        console.log(data);

        handleMutation(() => QuizService.create(data, image), (res) => {
            router.push(`/profile?id=${res.data.author.id}&tab=blog`)
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