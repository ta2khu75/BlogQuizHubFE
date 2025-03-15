import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { ExamAnswerActions } from '@/redux/slice/examAnswerSlice'
import { QuizType } from '@/types/QuizType'
type Props = {
    examId: string
    quiz: QuizDetailResponse
    index: number
}
const QuizElement = ({ quiz, index, examId }: Props) => {
    const { id: quizId, quiz_type: quizType } = quiz
    const dispatch = useAppDispatch();
    const examAnswer = useAppSelector(state => state.examAnswer);
    const answerIds = examAnswer?.[examId]?.[quiz.id] ?? [];
    const onRadioChange = (answerId: number) => {
        dispatch(ExamAnswerActions.add({ examId, quizId, answerId, quizType }))
    }
    const onCheckboxChange = (checked: boolean | "indeterminate", answerId: number) => {
        if (checked) {
            dispatch(ExamAnswerActions.add({ examId, quizId: quizId, answerId, quizType }))
        } else {
            dispatch(ExamAnswerActions.remove({ examId, quizId, answerId, quizType }))
        }
    }
    const renderAnswer = () => {
        switch (quiz.quiz_type) {
            case QuizType.MULTIPLE_CHOICE: {
                const answers = quiz.answers.map((answer) => (
                    <div key={answer.id} className="flex items-center space-x-2">
                        <Checkbox checked={answerIds.includes(answer.id)} onCheckedChange={checked => onCheckboxChange(checked, answer.id)} key={`a-${answer.id}`} value={answer.id} />
                        <Label htmlFor={`a-${answer.id}`}>{answer.id}</Label>
                    </div>
                ))
                return (
                    <>
                        {answers}
                    </>
                )
            }
            case QuizType.SINGLE_CHOICE: {
                const answers = quiz.answers.map((answer) => (
                    <div key={answer.id} className="flex items-center space-x-2">
                        <RadioGroupItem id={`a-${answer.id}`} value={`${answer.id}`} title={answer.answer} />
                        <Label htmlFor={`a-${answer.id}`}>{answer.answer}</Label>
                    </div>
                ))
                return <RadioGroup defaultValue={answerIds[0] ? `${answerIds[0]}` : undefined} onValueChange={(value) => onRadioChange(Number(value))}>
                    {answers}
                </RadioGroup>
            }
            default:
                return <p>Loại câu hỏi không được hỗ trợ</p>;
        }
    }
    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>
                    {index + 1}. {quiz.question}
                </CardTitle>
                <CardContent>
                    {renderAnswer()}
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default QuizElement