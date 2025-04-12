import AvatarElement from '@/components/elements/header/AvatarElement';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StringUtil from '@/util/StringUtil';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
    quizResultPage: PageResponse<QuizResultResponse> | undefined
}
const QuizResultList = ({ quizResultPage }: Props) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {quizResultPage?.content?.map(quizResult =>
            (<Card key={quizResult.info.id}>
                <CardHeader>
                    <div className='flex justify-between items-center'>
                        <Link href={`/profile?id=${quizResult.quiz.author.info.id}`}><AvatarElement account={quizResult.quiz.author} /></Link>
                    </div>
                    <CardTitle><Link href={`/quiz-result/${StringUtil.convertSlugUrl(quizResult.quiz.title)}-id-${quizResult.info.id}.html`} className='hover:underline'>{quizResult.quiz.title}</Link> </CardTitle>
                </CardHeader>
                <CardContent>
                    <Image src={quizResult.quiz.image_path} width={500} height={500} alt={quizResult.quiz.title} />
                </CardContent>
                <CardFooter className='grid grid-cols-2'>
                    <CardDescription>Point: {quizResult.point}</CardDescription>
                    <CardDescription>Correct: {quizResult.correct_count}/{quizResult.quiz.questions.length}</CardDescription>
                    <CardDescription>Level: {quizResult.quiz.quiz_level}</CardDescription>
                    <CardDescription>Duration: {quizResult.quiz.duration} {quizResult.quiz.duration > 1 ? "minutes" : "minute"}</CardDescription>
                </CardFooter>
            </Card>)
            )}
        </div>
    )
}

export default QuizResultList; 