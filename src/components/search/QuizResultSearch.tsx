import Paginator from '@/components/common/Paginator'
import QuizResultFilter from '@/components/filter/QuizResultFilter'
import QuizResultList from '@/components/list/QuizResultList'
import React from 'react'

const QuizResultSearch = () => {
    const [quizResultPage, setQuizResultPage] = React.useState<PageResponse<QuizResultResponse>>()

    return (
        <div className='flex'>
            <div className='w-1/3 sm:block hidden'>
                <QuizResultFilter setQuizResultPage={setQuizResultPage} />
            </div>
            <div className='w-2/3'>
                <QuizResultList quizResultPage={quizResultPage} />
                {quizResultPage && <Paginator page={quizResultPage} />}
            </div>
        </div>
    )
}

export default QuizResultSearch