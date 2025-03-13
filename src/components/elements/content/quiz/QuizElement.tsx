import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QuizType } from '@/types/QuizType'
import React from 'react'
type Props = {
    quiz: QuizDetailResponse
}
const QuizElement = ({ quiz }: Props) => {
    const renderAnswer = () => {
        switch (quiz.quiz_type) {
            case QuizType.MULTIPLE_CHOICE: {
                const answers = quiz.answers.map((answer) => (<Checkbox key={answer.id} value={answer.id} />))
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
                        <Label htmlFor={`a-${answer.id}`}>{answer.id}</Label>
                    </div>
                ))
                return <RadioGroup>
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
                    {quiz.question}
                </CardTitle>
                <CardContent>
                    {renderAnswer()}
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default QuizElement