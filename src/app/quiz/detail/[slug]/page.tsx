"use client"
import { CountdownTimerRef } from '@/components/common/CountdownTimer'
import QuestionElement from '@/components/elements/content/question/QuestionElement'
import QuizMenuElement from '@/components/elements/content/quiz/QuizMenuElement'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { UserAnswerActions } from '@/redux/slice/userAnswerSlice'
import QuizResultService from '@/services/QuizResultService'
import { QuizResultResponse } from '@/types/response/QuizResultResponse'
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
    const userAnswer = useAppSelector((state) => state.userAnswer?.[quizId]) ?? [];
    const countdownRef = useRef<CountdownTimerRef>(null);
    const [quizResult, setQuizResult] = useState<QuizResultResponse>();
    const [openResult, setOpenResult] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [openAlert, setOpenAlert] = useState([false, false])
    useEffect(() => {
        fetchQuiz()
    }, [quizId])
    const fetchSubmitQuiz = async () => {
        if (!quizResult) return
        const answerUser = !userAnswer ? [] : Object.entries(userAnswer).map(([question_id, answer_ids]) => ({
            question_id: Number(question_id),
            answer_ids: Array.isArray(answer_ids) ? (answer_ids as number[]) : [],
        }));
        try {
            countdownRef.current?.stopCountdown();
            const res = await QuizResultService.submitQuiz(quizResult?.id, { user_answers: answerUser })
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
    const slideState = useMemo(() => {
        if (quizResult) {
            return quizResult?.quiz.questions?.map((item, index) => {
                if (index === current) return "selected";
                if (userAnswer?.[`${item.id}`]) return "correct"
                if (openAlert[1]) return "error"
                else return "unselected"
            })
        } return []
    }, [current, quizResult, userAnswer, openAlert]);
    const onContinue = () => {
        if (Object.keys(userAnswer).length === quizResult?.quiz.questions?.length || openAlert[0]) {
            fetchSubmitQuiz()
        } else {
            setOpenAlert([true, true])
        }
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
                                <>
                                    {quizResult?.quiz.questions.map((question, index) => <QuestionElement quizId={quizResult.quiz.info.id} index={index} key={question.id} question={question} />)}
                                </>
                            </Carousel>
                        }
                    </CardContent>
                </Card>
            </Card>
            <QuizMenuElement onIndexClick={(index) => setCurrent(index)} states={slideState} />
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
            <Confirm title='Do you want submit quiz?' onContinue={() => onContinue()} onCancel={() => setOpenConfirm(false)} open={openConfirm} />
            <Confirm title='You have not answer all question. Do you want submit quiz?' onContinue={() => onContinue()} onCancel={() => setOpenAlert(prev => [false, prev[1]])} open={openAlert[0]} />
        </>
    )
}

export default QuizDetailPage