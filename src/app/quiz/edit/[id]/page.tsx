"use client"
import QuizForm from '@/components/form/QuizForm'
import { useToast } from '@/hooks/use-toast'
import QuizCategoryService from '@/services/QuizCategoryService'
import QuizService from '@/services/QuizService'
import { QuizResponse } from '@/types/response/QuizResponse'
import FunctionUtil from '@/util/FunctionUtil'
import { use, useEffect, useState } from 'react'

const QuizEditPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { toast } = useToast()
    const { id } = use(params)
    const [quizCategories, setQuizCategories] = useState<QuizCategoryResponse[]>([]);
    const [quiz, setQuiz] = useState<QuizResponse>();
    useEffect(() => {
        fetchQuizCategoryList()
        fetchQuiz()
    }, [id])
    const fetchQuiz = () => {
        QuizService.readDetail(id).then(res => {
            if (res.success) {
                setQuiz(res.data)
            } else {
                console.log(res.message_error)
            }
        }).catch(err =>
            toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
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
        <QuizForm quizCategories={quizCategories} quiz={quiz} />
    )
}

export default QuizEditPage