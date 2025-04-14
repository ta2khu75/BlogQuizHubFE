import AvatarElement from '@/components/elements/header/AvatarElement'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
type Props = {
    quiz: QuizResponse
}
const QuizReportElement = ({ quiz }: Props) => {
    return (<Card key={quiz.info.id}>
        <CardHeader>
            <div className='flex justify-between items-center'>
                <Link href={`/profile?id=${quiz.author.info.id}`}><AvatarElement account={quiz.author} /></Link>
            </div>
            <CardTitle>{quiz.title}</CardTitle>
        </CardHeader>
        <CardFooter className='grid grid-cols-2'>
            <CardDescription>Category: {quiz.quiz_category.name}</CardDescription>
        </CardFooter>
    </Card>)
}

export default QuizReportElement