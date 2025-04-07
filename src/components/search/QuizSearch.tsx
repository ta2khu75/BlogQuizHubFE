import Pageination from '@/components/elements/util/Pageination'
import QuizFilter from '@/components/filter/QuizFilter'
import QuizList from '@/components/list/QuizList'
import React from 'react'

const QuizSearch = () => {
    const [quizPage, setQuizPage] = React.useState<PageResponse<QuizResponse>>()
    return (
        <div>
            <QuizFilter setQuizPage={setQuizPage} />
            <QuizList quizPage={quizPage} />
            {quizPage && <Pageination<QuizResponse> page={quizPage} />}
        </div>
    )
}

export default QuizSearch