import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { UserAnswerActions } from '@/redux/slice/userAnswerSlice'
import { QuizType } from '@/types/QuizType'
import { Check, X } from 'lucide-react'
type Props = {
    examId: string
    quiz: QuizResponse
    index: number,
    showResult?: boolean,
    showAnswer?: boolean,
    userAnswerResult?: number[]
}
const QuizElement = ({ quiz, index, examId, showResult = false, showAnswer = false, userAnswerResult = [] }: Props) => {
    const { id: quizId, quiz_type: quizType } = quiz
    const dispatch = useAppDispatch();
    const userAnswer = useAppSelector(state => state.userAnswer);
    const answerIds = userAnswer?.[examId]?.[quiz.id] ?? [];
    const onRadioChange = (answerId: number) => {
        dispatch(UserAnswerActions.add({ examId, quizId, answerId, quizType }))
    }
    const onCheckboxChange = (checked: boolean | "indeterminate", answerId: number) => {
        if (checked) {
            dispatch(UserAnswerActions.add({ examId, quizId: quizId, answerId, quizType }))
        } else {
            dispatch(UserAnswerActions.remove({ examId, quizId, answerId, quizType }))
        }
    }
    const renderAnswer = () => {
        switch (quiz.quiz_type) {
            case QuizType.MULTIPLE_CHOICE: {
                const answers = quiz?.answers?.map((answer) => (
                    <div key={answer.id} className="flex items-center space-x-2">
                        <Checkbox disabled={showResult} checked={showResult ? userAnswerResult.includes(answer.id) : answerIds.includes(answer.id)} onCheckedChange={checked => onCheckboxChange(checked, answer.id)} key={`a-${answer.id}`} value={answer.id} />
                        <Label htmlFor={`a-${answer.id}`}>{answer.id}</Label>
                        {showAnswer && answer.correct && <span className='text-green-500'>  <Check /></span>}
                    </div>
                ))
                return (
                    <>
                        {answers}
                    </>
                )
            }
            case QuizType.SINGLE_CHOICE: {
                const answers = quiz?.answers?.map((answer) => (
                    <div key={answer.id} className="flex items-center space-x-2">
                        <RadioGroupItem id={`a-${answer.id}`} value={`${answer.id}`} title={answer.answer} />
                        <Label htmlFor={`a-${answer.id}`}>{answer.answer}</Label>
                        {showAnswer && answer.correct && <span className='text-green-500'>  <Check /></span>}
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
        if (quizType === QuizType.MULTIPLE_CHOICE) {
            return quiz.answers?.every(answer => !answer.correct || userAnswerResult.includes(answer.id));
        } else {
            return quiz.answers?.some(answer => answer.correct && answer.id === userAnswerResult[0]);
        }
    }
    return (
        <Card className='w-full'>
            <CardHeader className=''>
                <CardTitle className='flex justify-between'>
                    <span>{index + 1}. {quiz.question}</span>
                    {showResult &&
                        <span className='text-xl'>
                            {isCorrect() ? <span className='text-green-500'>  <Check /></span> : <span className='text-red-500'><X /></span>}
                        </span>
                    }
                </CardTitle>
                {/* <p>Đáp án đúng: {quiz.answers?.filter(answer => answer.correct).map(answer => answer.answer).join(', ')}</p> */}
                <CardContent>
                    {renderAnswer()}
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default QuizElement