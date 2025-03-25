import AvatarElement from '@/components/elements/header/AvatarElement';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import QuizResultService from '@/services/QuizResultService';
import FunctionUtil from '@/util/FunctionUtil';
import StringUtil from '@/util/StringUtil';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
const size = 20
const QuizResultSearch = () => {
    const { toast } = useToast()
    const searchParams = useSearchParams()
    const authorId = searchParams.get("id")
    const [quizResultPage, setQuizResultPage] = useState<PageResponse<QuizResultResponse>>()
    useEffect(() => {
        fetchSearchBlog()
    }, [authorId])
    const fetchSearchBlog = () => {
        if (!authorId) return;
        QuizResultService.search({ page: 1, size, authorId: authorId }).then(res => {
            if (res.success) {
                setQuizResultPage(res.data);
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
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

export default QuizResultSearch; 