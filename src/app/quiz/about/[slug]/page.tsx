"use client"
import { Button } from '@/components/ui/button'
import { CardDescription } from '@/components/ui/card'
import useAuth from '@/hooks/useIsAuth'
import { quizHooks } from '@/redux/api/quizApi'
import StringUtil from '@/util/StringUtil'
import Image from 'next/image'
import Link from 'next/link'
type Props = {
    id: string
}
const QuizAboutPage = ({ id }: Props) => {
    const { data } = quizHooks.useReadQuizQuery(id, { skip: !id })
    const quiz = data?.data
    const auth = useAuth()
    const isAuthor = auth !== null
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 mt-8'>
            <div className='flex flex-col justify-center'>
                <h1 className='text-6xl font-bold'>{quiz?.title}</h1>
                <h2 className='text-2xl'>Author: <Link href={`/profile?id=${quiz?.author.id}`} className='hover:underline'>{quiz?.author.display_name}</Link></h2>
                {isAuthor && <h3 className='text-2xl'>{quiz?.access_modifier}</h3>}
                <p>Duration: {quiz?.duration} minutes</p>
                <p>Level: {quiz?.level} minutes</p>
                <p>Status: {quiz?.completed ? "Completed" : "Not completed"}</p>
                <CardDescription className='description'>{quiz?.description}</CardDescription>
                <Link href={`/quiz/detail/${StringUtil.convertSlugUrl(quiz?.title ?? "")}-q${quiz?.id}`}><Button>Start Quiz</Button></Link>
            </div>
            {
                quiz?.image_path &&
                <Image className='w-full' src={quiz?.image_path} alt={quiz?.title ?? ""} width={1000} height={1000} />
            }
        </div >
    )
}

export default QuizAboutPage