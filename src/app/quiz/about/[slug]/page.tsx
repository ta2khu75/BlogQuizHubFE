"use client"
import { Button } from '@/components/ui/button'
import { CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAppSelector } from '@/redux/hooks'
import QuizService from '@/services/QuizService'
import FunctionUtil from '@/util/FunctionUtil'
import StringUtil from '@/util/StringUtil'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect, useMemo, useState } from 'react'

const QuizAboutPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params)
    const { toast } = useToast()
    const quizId = useMemo(() => StringUtil.getIdFromSlugUrl(slug), [slug])
    const [quiz, setQuiz] = useState<QuizResponse>()
    const auth = useAppSelector(state => state.auth)
    const isAuthor = useMemo(() => auth.account?.info.id === quiz?.author.info.id, [auth.account?.info.id, quiz?.author.info.id])
    useEffect(() => {
        fetchQuiz()
    }, [quizId])
    const fetchQuiz = () => {
        QuizService.read(quizId).then(res => {
            if (res.success) {
                setQuiz(res.data)
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 mt-8'>
            <div className='flex flex-col justify-center'>
                <h1 className='text-6xl font-bold'>{quiz?.title}</h1>
                <h2 className='text-2xl'>Author: <Link href={`/profile?id=${quiz?.author.info.id}`} className='hover:underline'>{quiz?.author.username}</Link></h2>
                {isAuthor && <h3 className='text-2xl'>{quiz?.access_modifier}</h3>}
                <p>Duration: {quiz?.duration} minutes</p>
                <p>Level: {quiz?.quiz_level} minutes</p>
                <p>Status: {quiz?.isCompleted ? "Completed" : "Not completed"}</p>
                <CardDescription className='description'>{quiz?.description}</CardDescription>
                <Link href={`/quiz/detail/${StringUtil.convertSlugUrl(quiz?.title ?? "")}-id-${quiz?.info.id}`}><Button>Start Quiz</Button></Link>
            </div>
            {
                quiz?.image_path &&
                <Image className='w-full' src={quiz?.image_path} alt={quiz?.title ?? ""} width={1000} height={1000} />
            }
        </div >
    )
}

export default QuizAboutPage