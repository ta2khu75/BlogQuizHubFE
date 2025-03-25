"use client"
import QuestionElement from '@/components/elements/content/quiz/QuestionElement'
import Carousel from '@/components/elements/util/Carousel'
import Confirm from '@/components/elements/util/Confirm'
import CountdownTimer, { CountdownTimerRef } from '@/components/elements/util/CountdownTimer'
import Modal from '@/components/elements/util/Modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { UserAnswerActions } from '@/redux/slice/userAnswerSlice'
import QuizResultService from '@/services/QuizResultService'
import FunctionUtil from '@/util/FunctionUtil'
import StringUtil from '@/util/StringUtil'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useMemo, useRef, useState } from 'react'

const QuizDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params)
    const { toast } = useToast()
    const router = useRouter();
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.auth)
    const [current, setCurrent] = useState(0)
    const quizId = useMemo(() => StringUtil.getIdFromSlugUrl(slug), [slug])
    const quizAnswer = useAppSelector((state) => state.userAnswer?.[quizId ?? ""]) ?? [];
    const countdownRef = useRef<CountdownTimerRef>(null);
    const [quizResult, setQuizResult] = useState<QuizResultResponse>();
    const [openResult, setOpenResult] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    useEffect(() => {
        fetchQuiz()
    }, [quizId])
    const fetchSubmitQuiz = async () => {
        if (!quizResult) return
        const answerUser = !quizAnswer ? [] : Object.entries(quizAnswer).map(([question_id, answer_ids]) => ({
            question_id: Number(question_id),
            answer_ids: Array.isArray(answer_ids) ? (answer_ids as number[]) : [],
        }));
        try {
            countdownRef.current?.stopCountdown();
            const res = await QuizResultService.submitQuiz(quizResult?.info.id, { user_answers: answerUser })
            if (res.success) {
                setQuizResult(res.data)
                setOpenResult(true)
                dispatch(UserAnswerActions.delete(quizId))
            }
            else {
                toast({ variant: "destructive", description: res.message_error })
            }
        } catch (error) {
            toast({ variant: "destructive", description: FunctionUtil.showError(error) })
        }
    }
    const fetchQuiz = () => {
        QuizResultService.takeQuiz(quizId).then(res => {
            if (res.success) {
                setQuizResult(res.data)
                if (res.status_code === 201) {
                    dispatch(UserAnswerActions.delete(quizId))
                }
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    const onCancelResult = () => {
        router.push(`/profile?id=${auth.account?.info.id}&tab=quizResult`)
    }
    return (
        <>
            <Card className='w-full'>
                <CardHeader className='flex-row justify-between'>
                    <CardTitle>{quizResult?.quiz.title}</CardTitle>
                    {quizResult?.end_time &&
                        <CountdownTimer ref={countdownRef} onTimeUp={fetchSubmitQuiz} dateString={quizResult?.end_time} />
                    }
                    <Button onClick={() => setOpenConfirm(true)}>Submit</Button>
                </CardHeader>
                <Card>
                    <CardContent >
                        {quizResult?.quiz?.questions?.length &&
                            <Carousel count={quizResult?.quiz?.questions?.length - 1} current={current} className='max-w-[100vh]' onNextSlide={() => setCurrent(current + 1)} onPrevSlide={() => setCurrent(current - 1)} >
                                {quizResult?.quiz.questions.map((question, index) => <QuestionElement quizId={quizResult.quiz.info.id} index={index} key={question.id} question={question} />)}
                            </Carousel>
                        }
                    </CardContent>
                </Card>
            </Card>
            <Modal open={openResult} onCancel={() => onCancelResult()}>
                <Card className='w-full'>
                    <CardHeader className='flex-row justify-between'>
                        <CardTitle>Result</CardTitle>
                    </CardHeader>
                    <CardContent >
                        <div className='flex flex-col gap-5'>
                            correct answer: {quizResult?.correct_count}
                            Point: {quizResult?.point}
                        </div>
                    </CardContent>
                </Card>
            </Modal>
            <Confirm title='Do you want submit quiz?' onContinue={() => fetchSubmitQuiz()} onCancel={() => setOpenConfirm(false)} open={openConfirm} />
        </>
    )
}

export default QuizDetailPage