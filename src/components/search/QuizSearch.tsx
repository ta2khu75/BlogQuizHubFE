import Pageination from '@/components/elements/util/Pageination'
import QuizFilter from '@/components/filter/QuizFilter'
import QuizList from '@/components/list/QuizList'
import React from 'react'

const QuizSearch = () => {
    const [quizPage, setQuizPage] = React.useState<PageResponse<QuizResponse>>()
    return (
        <div className='flex'>
            <div className='w-1/3 sm:block hidden'>
                <QuizFilter setQuizPage={setQuizPage} />
            </div>
            <div className='w-2/3'>
                <QuizList quizPage={quizPage} />
                {quizPage && <Pageination<QuizResponse> page={quizPage} />}
            </div>
        </div>
    )
}

export default QuizSearch