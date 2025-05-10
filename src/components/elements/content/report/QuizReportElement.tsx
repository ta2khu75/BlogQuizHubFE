import AvatarElement from '@/components/common/AvatarElement'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { QuizResponse } from '@/types/response/QuizResponse'
import Link from 'next/link'
import React from 'react'
type Props = {
    quiz: QuizResponse
}
const QuizReportElement = ({ quiz }: Props) => {
    return (<Card key={quiz.id}>
        <CardHeader>
            <div className='flex justify-between items-center'>
                <Link href={`/profile?id=${quiz.author.id}`}><AvatarElement profile={quiz.author} /></Link>
            </div>
            <CardTitle>{quiz.title}</CardTitle>
        </CardHeader>
        <CardFooter className='grid grid-cols-2'>
            <CardDescription>Category: {quiz.category.name}</CardDescription>
        </CardFooter>
    </Card>)
}

export default QuizReportElement