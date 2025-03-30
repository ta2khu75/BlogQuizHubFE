"use client"
import QuestionElement from '@/components/elements/content/question/QuestionElement';
import Carousel from '@/components/elements/util/Carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import QuizResultService from '@/services/QuizResultService';
import { QuizResultMode } from '@/types/DisplayMode';
import UserAnswerResponse from '@/types/response/UserAnswerResponse';
import FunctionUtil from '@/util/FunctionUtil';
import StringUtil from '@/util/StringUtil';
import React, { use, useEffect, useMemo, useState } from 'react'

const QuizResultPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params)
    const { toast } = useToast()
    const [current, setCurrent] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)
    const quizResultId = useMemo(() => StringUtil.getIdFromSlugUrl(slug), [slug])
    const [userAnswer, setUserAnswer] = useState<UserAnswerResponse[]>([])
    const [quizResult, setQuizResult] = useState<QuizResultResponse>();
    const fetchQuizResult = () => {
        QuizResultService.readDetailById(quizResultId).then(res => {
            if (res.success) {
                setQuizResult(res.data)
                setUserAnswer(res.data.user_answers ?? [])
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => {
            toast({ variant: "destructive", description: FunctionUtil.showError(err) })
        })
    }
    useEffect(() => {
        fetchQuizResult()
    }, [])
    return (
        <Card className='w-full'>
            <CardHeader className='flex-row justify-around'>
                <CardTitle>{quizResult?.quiz.title}</CardTitle>
                <p>Correct: {quizResult?.correct_count}/{quizResult?.quiz?.questions?.length ?? 0}</p>
                <p>Point: {quizResult?.point}</p>
                {quizResult?.quiz.quiz_result_mode === QuizResultMode.ANSWER_VISIBLE &&
                    <Button onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? "Hide answer" : "Show answer"}</Button>
                }
            </CardHeader>
            <Card>
                <CardContent >
                    {quizResult?.quiz?.questions?.length &&
                        <Carousel count={quizResult?.quiz?.questions?.length - 1} current={current} className='max-w-[100vh]' onNextSlide={() => setCurrent(current + 1)} onPrevSlide={() => setCurrent(current - 1)} >
                            {quizResult?.quiz.questions.map((question, index) => <QuestionElement showResult={quizResult.quiz.quiz_result_mode === QuizResultMode.QUESTION_RESULT_VISIBLE} showAnswer={showAnswer && quizResult.quiz.quiz_result_mode === QuizResultMode.ANSWER_VISIBLE} quizId={quizResult.quiz.info.id} index={index} key={question.id} question={question}
                                userAnswerResult={userAnswer.find(userAnswer => userAnswer.question.id === question.id)} />)}
                        </Carousel>
                    }
                </CardContent>
            </Card>
        </Card>
    )
}

export default QuizResultPage 