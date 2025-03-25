import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { UserAnswerActions } from '@/redux/slice/userAnswerSlice'
import { QuestionType } from '@/types/QuestionType'
import { Check, X } from 'lucide-react'
type Props = {
    quizId: string
    question: QuestionResponse
    index: number,
    showResult?: boolean,
    showAnswer?: boolean,
    userAnswerResult?: number[]
}
const QuestionElement = ({ question, index, quizId, showResult = false, showAnswer = false, userAnswerResult = [] }: Props) => {
    const { id: questionId, question_type: questionType } = question
    const dispatch = useAppDispatch();
    const userAnswer = useAppSelector(state => state.userAnswer);
    const answerIds = userAnswer?.[quizId]?.[question.id] ?? [];
    const onRadioChange = (answerId: number) => {
        dispatch(UserAnswerActions.add({ quizId, questionId, answerId, questionType }))
    }
    const onCheckboxChange = (checked: boolean | "indeterminate", answerId: number) => {
        if (checked) {
            dispatch(UserAnswerActions.add({ quizId, questionId: questionId, answerId, questionType }))
        } else {
            dispatch(UserAnswerActions.remove({ quizId, questionId, answerId, questionType }))
        }
    }
    const renderAnswer = () => {
        switch (question.question_type) {
            case QuestionType.MULTIPLE_CHOICE: {
                const answers = question?.answers?.map((answer) => (
                    <div key={answer.id} className="flex items-center space-x-2">
                        <Checkbox disabled={showResult} checked={showResult ? userAnswerResult.includes(answer.id) : answerIds.includes(answer.id)} onCheckedChange={checked => onCheckboxChange(checked, answer.id)} key={`a-${answer.id}`} value={answer.id} />
                        <Label className={showAnswer && answer.correct ? "text-green-600" : ""} htmlFor={`a-${answer.id}`}>{answer.id}</Label>
                    </div>
                ))
                return (
                    <>
                        {answers}
                    </>
                )
            }
            case QuestionType.SINGLE_CHOICE: {
                const answers = question?.answers?.map((answer) => (
                    <div key={answer.id} className="flex items-center space-x-2">
                        <RadioGroupItem id={`a-${answer.id}`} value={`${answer.id}`} title={answer.answer} />
                        <Label className={showAnswer && answer.correct ? "text-green-600" : ""} htmlFor={`a-${answer.id}`}>{answer.answer}</Label>
                    </div>
                ))
                return <RadioGroup disabled={showResult} defaultValue={showResult ? `${userAnswerResult?.[0]}` : `${answerIds?.[0]}`} onValueChange={(value) => onRadioChange(Number(value))}>
                    {answers}
                </RadioGroup>
            }
            default:
                return <p>Loại câu hỏi không được hỗ trợ</p>;
        }
    }
    const isCorrect = () => {
        if (questionType === QuestionType.MULTIPLE_CHOICE) {
            return question.answers?.every(answer => !answer.correct || userAnswerResult.includes(answer.id));
        } else {
            return question.answers?.some(answer => answer.correct && answer.id === userAnswerResult[0]);
        }
    }
    return (
        <Card className='w-full'>
            <CardHeader className=''>
                <CardTitle className='flex justify-between'>
                    <span>{index + 1}. {question.question}</span>
                    {showResult &&
                        <span className='text-xl'>
                            {isCorrect() ? <span className='text-green-500'>  <Check /></span> : <span className='text-red-500'><X /></span>}
                        </span>
                    }
                </CardTitle>
                {/* <p>Đáp án đúng: {question.answers?.filter(answer => answer.correct).map(answer => answer.answer).join(', ')}</p> */}
                <CardContent>
                    {renderAnswer()}
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default QuestionElement