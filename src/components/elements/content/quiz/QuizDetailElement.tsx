import QuestionElement from '@/components/elements/content/question/QuestionElement'
import QuizMenuElement from '@/components/elements/content/quiz/QuizMenuElement'
import Carousel from '@/components/elements/util/Carousel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useMemo } from 'react'
type Props = {
    quiz?: QuizResponse
}
const QuizDetailElement = ({ quiz }: Props) => {
    const [current, setCurrent] = React.useState(0);
    const slideState = useMemo(() => {
        if (quiz) {
            return quiz.questions?.map((item, index) => {
                if (index === current) return "selected";
                else return "unselected"
            })
        } return []
    }, [current]);
    return (
        <>
            <Card className='w-full'>
                <CardHeader className='flex-row justify-between'>
                    <CardTitle>{quiz?.title}</CardTitle>
                </CardHeader>
                <Card>
                    <CardContent >
                        {quiz?.questions?.length &&
                            <Carousel count={quiz?.questions?.length - 1} current={current} className='max-w-[100vh]' onNextSlide={() => setCurrent(current + 1)} onPrevSlide={() => setCurrent(current - 1)} >
                                <>
                                    {quiz.questions.map((question, index) => <QuestionElement quizId={quiz.info.id} index={index} key={question.id} question={question} />)}
                                </>
                            </Carousel>
                        }
                    </CardContent>
                </Card>
            </Card>
            <QuizMenuElement onIndexClick={(index) => setCurrent(index)} states={slideState} />
        </>
    )
}

export default QuizDetailElement