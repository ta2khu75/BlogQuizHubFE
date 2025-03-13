"use client"
import QuizElement from '@/components/elements/content/quiz/QuizElement'
import Carousel from '@/components/elements/util/Carousel'
import Confirm from '@/components/elements/util/Confirm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import ExamResultService from '@/services/ExamResultService'
import FunctionUtil from '@/util/FunctionUtil'
import StringUtil from '@/util/StringUtil'
import React, { use, useEffect, useMemo, useState } from 'react'

const ExamDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params)
    const { toast } = useToast()
    const [current, setCurrent] = useState(0)
    const examId = useMemo(() => StringUtil.getIdFromSlugUrl(slug), [slug])
    const [examResult, setExamResult] = useState<ExamResultResponse>();
    const [openConfirm, setOpenConfirm] = useState(false)
    useEffect(() => {
        fetchExam()
    }, [examId])
    const fetchExam = () => {
        ExamResultService.takeExam(examId).then(res => {
            if (res.success) {
                setExamResult(res.data)
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    return (
        <>
            <Card className='w-full'>
                <CardHeader className='flex-row justify-between'>
                    <CardTitle>{examResult?.exam.title}</CardTitle>

                    <Button onClick={() => setOpenConfirm(true)}>Submit</Button>
                </CardHeader>
                <Card>
                    <CardContent >
                        {examResult?.exam?.quizzes?.length &&
                            <Carousel count={examResult?.exam?.quizzes?.length - 1} current={current} className='max-w-[100vh]' onNextSlide={() => setCurrent(current + 1)} onPrevSlide={() => setCurrent(current - 1)} >
                                {examResult?.exam.quizzes.map((quiz) => <QuizElement key={quiz.id} quiz={quiz} />)}
                            </Carousel>
                        }
                    </CardContent>
                </Card>
            </Card>
            <Confirm title='Do you want submit exam?' onContinue={() => console.log("confirm")} onCancel={() => setOpenConfirm(false)} open={openConfirm} />
        </>
    )
}

export default ExamDetailPage