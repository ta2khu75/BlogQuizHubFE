"use client"
import TitleContent from '@/components/common/TitleContent'
import QuizForm from '@/components/form/QuizForm'
import { useToast } from '@/hooks/use-toast'
import QuizCategoryService from '@/services/QuizCategoryService'
import React, { useEffect, useState } from 'react'

const QuizCreatePage = () => {
    const { toast } = useToast()
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
    return (
        <>
            <TitleContent className='text-center mb-8'>Create Quiz</TitleContent>
            <QuizForm quizCategories={quizCategories} />
        </>
    )
}

export default QuizCreatePage