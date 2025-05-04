import AvatarElement from '@/components/common/AvatarElement';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useIsAuthor from '@/components/util/useIsAuthor';
import StringUtil from '@/util/StringUtil';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
    quizPage: PageResponse<QuizResponse> | undefined
}
const QuizList = ({ quizPage }: Props) => {
    const isAuthor = useIsAuthor()
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {quizPage?.content?.map(quiz =>
            (<Card key={quiz.info.id}>
                <CardHeader>
                    <div className='flex justify-between items-center'>
                        <Link href={`/profile?id=${quiz.author.info.id}`}><AvatarElement account={quiz.author} /></Link>
                        {isAuthor && !quiz.completed && <>{quiz.access_modifier} <Button variant={"link"}><Link href={`/quiz/edit/${quiz.info.id}`}>Edit</Link></Button></>}
                    </div>
                    <CardTitle><Link href={`/quiz/about/${StringUtil.convertSlugUrl(quiz.title)}-id-${quiz.info.id}.html`} className='hover:underline'>{quiz.title}</Link> </CardTitle>
                </CardHeader>
                <CardContent>
                    <Image src={quiz.image_path} width={500} height={500} alt={quiz.title} />
                </CardContent>
                <CardFooter className='grid grid-cols-2'>
                    <CardDescription>Category: {quiz.quiz_category.name}</CardDescription>
                    <CardDescription>Duration: {quiz.duration} {quiz.duration > 1 ? "minutes" : "minute"}</CardDescription>
                    <CardDescription>Level: {quiz.quiz_level}</CardDescription>
                    <CardDescription>Status: {quiz.completed ? "Completed" : "Not completed"}</CardDescription>
                </CardFooter>
            </Card>)
            )}
        </div>
    )
}

export default QuizList 