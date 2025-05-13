import AvatarElement from '@/components/common/AvatarElement'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { QuizResponse } from '@/types/response/QuizResponse'
import Link from 'next/link'
import React from 'react'
type Props = {
    quiz: QuizResponse,
    makeUrl: (profileId: number) => string
}
const QuizReportRender = ({ quiz, makeUrl }: Props) => {

    return (<div className='flex flex-col gap-2'>
        <Link href={makeUrl(quiz.author.id)}><AvatarElement profile={quiz.author} /></Link>
        <CardTitle>
            {quiz.title}
        </CardTitle>
        <CardDescription>Category: {quiz.category.name}</CardDescription>
    </div>
    )
}

export default QuizReportRender