"use client"
import QuizElement from '@/components/elements/content/quiz/QuizElement';
import Carousel from '@/components/elements/util/Carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ExamResultService from '@/services/ExamResultService';
import UserAnswerResponse from '@/types/response/UserAnswerResponse';
import FunctionUtil from '@/util/FunctionUtil';
import StringUtil from '@/util/StringUtil';
import React, { use, useEffect, useMemo, useState } from 'react'

const ExamResultPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params)
    const { toast } = useToast()
    const [current, setCurrent] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)
    const examResultId = useMemo(() => StringUtil.getIdFromSlugUrl(slug), [slug])
    const [userAnswer, setUserAnswer] = useState<UserAnswerResponse[]>([])
    const [examResult, setExamResult] = useState<ExamResultResponse>();
    const fetchExamResult = () => {
        ExamResultService.readDetailById(examResultId).then(res => {
            if (res.success) {
                setExamResult(res.data)
                setUserAnswer(res.data.user_answers ?? [])
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => {
            toast({ variant: "destructive", description: FunctionUtil.showError(err) })
        })
    }
    useEffect(() => {
        fetchExamResult()
    }, [])
    return (
        <Card className='w-full'>
            <CardHeader className='flex-row justify-around'>
                <CardTitle>{examResult?.exam.title}</CardTitle>
                <p>Correct: {examResult?.correct_count}/{examResult?.exam?.quizzes?.length ?? 0}</p>
                <p>Point: {examResult?.point}</p>
                <Button onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? "Hide answer" : "Show answer"}</Button>
            </CardHeader>
            <Card>
                <CardContent >
                    {examResult?.exam?.quizzes?.length &&
                        <Carousel count={examResult?.exam?.quizzes?.length - 1} current={current} className='max-w-[100vh]' onNextSlide={() => setCurrent(current + 1)} onPrevSlide={() => setCurrent(current - 1)} >
                            {examResult?.exam.quizzes.map((quiz, index) => <QuizElement showAnswer={showAnswer} userAnswerResult={userAnswer.filter(userAnswer => userAnswer.quiz.id === quiz.id).flatMap(quiz => { return quiz.answers.map((answer) => answer.id) }) ?? []} showResult={true} examId={examResult.exam.info.id} index={index} key={quiz.id} quiz={quiz} />)}
                        </Carousel>
                    }
                </CardContent>
            </Card>
        </Card>
    )
}

export default ExamResultPage 