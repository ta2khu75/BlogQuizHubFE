"use client"
import QuizForm from '@/components/form/QuizForm'
import { useToast } from '@/hooks/use-toast'
import QuizCategoryService from '@/services/QuizCategoryService'
import FunctionUtil from '@/util/FunctionUtil'
import React, { useEffect, useState } from 'react'

const QuizCreatePage = () => {
    const { toast } = useToast()
    const [quizCategories, setQuizCategories] = useState<QuizCategoryResponse[]>([]);
    useEffect(() => {
        fetchQuizCategoryList()
    }, [])

    const fetchQuizCategoryList = () => {
        QuizCategoryService.readAll().then(res => {
            if (res.success) {
                setQuizCategories(res.data)
            } else {
                console.log(res.message_error)
            }
        }).catch(err =>
            toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    return (
        <QuizForm quizCategories={quizCategories} />
    )
}

export default QuizCreatePage