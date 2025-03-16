"use client"
import QuizElement from '@/components/elements/content/quiz/QuizElement'
import Carousel from '@/components/elements/util/Carousel'
import Confirm from '@/components/elements/util/Confirm'
import CountdownTimer, { CountdownTimerRef } from '@/components/elements/util/CountdownTimer'
import Modal from '@/components/elements/util/Modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { ExamAnswerActions } from '@/redux/slice/examAnswerSlice'
import ExamResultService from '@/services/ExamResultService'
import FunctionUtil from '@/util/FunctionUtil'
import StringUtil from '@/util/StringUtil'
import React, { use, useEffect, useMemo, useRef, useState } from 'react'

const ExamDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params)
    const { toast } = useToast()
    const dispatch = useAppDispatch()
    const [current, setCurrent] = useState(0)
    const examId = useMemo(() => StringUtil.getIdFromSlugUrl(slug), [slug])
    const examAnswer = useAppSelector((state) => state.examAnswer?.[examId ?? ""]) ?? [];
    const countdownRef = useRef<CountdownTimerRef>(null);
    const [examResult, setExamResult] = useState<ExamResultResponse>();
    const [openResult, setOpenResult] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    useEffect(() => {
        fetchExam()
    }, [examId])
    const fetchSubmitExam = async () => {
        if (!examResult) return
        const answerUser = !examAnswer ? [] : Object.entries(examAnswer).map(([quiz_id, answer_ids]) => ({
            quiz_id: Number(quiz_id),
            answer_ids: Array.isArray(answer_ids) ? (answer_ids as number[]) : [],
        }));
        try {
            countdownRef.current?.stopCountdown();
            const res = await ExamResultService.submitExam(examResult?.info.id, { exam_answer: answerUser })
            if (res.success) {
                setExamResult(res.data)
                setOpenResult(true)
                dispatch(ExamAnswerActions.delete(examId))
            }
            else {
                toast({ variant: "destructive", description: res.message_error })
            }
        } catch (error) {
            toast({ variant: "destructive", description: FunctionUtil.showError(error) })
        }
    }
    const fetchExam = () => {
        ExamResultService.takeExam(examId).then(res => {
            if (res.success) {
                setExamResult(res.data)
                if (res.status_code === 201) {
                    dispatch(ExamAnswerActions.delete(examId))
                }
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
                    {examResult?.end_time &&
                        <CountdownTimer ref={countdownRef} onTimeUp={fetchSubmitExam} dateString={examResult?.end_time} />
                    }
                    <Button onClick={() => setOpenConfirm(true)}>Submit</Button>
                </CardHeader>
                <Card>
                    <CardContent >
                        {examResult?.exam?.quizzes?.length &&
                            <Carousel count={examResult?.exam?.quizzes?.length - 1} current={current} className='max-w-[100vh]' onNextSlide={() => setCurrent(current + 1)} onPrevSlide={() => setCurrent(current - 1)} >
                                {examResult?.exam.quizzes.map((quiz, index) => <QuizElement examId={examResult.exam.info.id} index={index} key={quiz.id} quiz={quiz} />)}
                            </Carousel>
                        }
                    </CardContent>
                </Card>
            </Card>
            <Modal open={openResult} onCancel={() => setOpenResult(false)}>
                <Card className='w-full'>
                    <CardHeader className='flex-row justify-between'>
                        <CardTitle>Result</CardTitle>
                    </CardHeader>
                    <CardContent >
                        <div className='flex flex-col gap-5'>
                            correct answer: {examResult?.correct_count}
                            Point: {examResult?.point}
                        </div>
                    </CardContent>
                </Card>
            </Modal>
            <Confirm title='Do you want submit exam?' onContinue={() => fetchSubmitExam()} onCancel={() => setOpenConfirm(false)} open={openConfirm} />
        </>
    )
}

export default ExamDetailPage