import Pageination from '@/components/elements/util/Pageination'
import QuizResultFilter from '@/components/filter/QuizResultFilter'
import QuizResultList from '@/components/list/QuizResultList'
import React from 'react'

const QuizResultSearch = () => {
    const [quizResultPage, setQuizResultPage] = React.useState<PageResponse<QuizResultResponse>>()

    return (
        <>
            <QuizResultFilter setQuizResultPage={setQuizResultPage} />
            <QuizResultList quizResultPage={quizResultPage} />
            {quizResultPage && <Pageination<QuizResultResponse> page={quizResultPage} />}
        </>
    )
}

export default QuizResultSearch