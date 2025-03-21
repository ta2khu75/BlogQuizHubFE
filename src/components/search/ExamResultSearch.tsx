import AvatarElement from '@/components/elements/header/AvatarElement';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ExamResultService from '@/services/ExamResultService';
import FunctionUtil from '@/util/FunctionUtil';
import StringUtil from '@/util/StringUtil';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
const size = 20
const ExamResultSearch = () => {
    const { toast } = useToast()
    const searchParams = useSearchParams()
    const authorId = searchParams.get("id")
    const [examResultPage, setExamResultPage] = useState<PageResponse<ExamResultResponse>>()
    useEffect(() => {
        fetchSearchBlog()
    }, [authorId])
    const fetchSearchBlog = () => {
        if (!authorId) return;
        ExamResultService.search({ page: 1, size, authorId: authorId }).then(res => {
            if (res.success) {
                setExamResultPage(res.data);
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {examResultPage?.content?.map(examResult =>
            (<Card key={examResult.info.id}>
                <CardHeader>
                    <div className='flex justify-between items-center'>
                        <Link href={`/profile?id=${examResult.exam.author.info.id}`}><AvatarElement account={examResult.exam.author} /></Link>
                    </div>
                    <CardTitle><Link href={`/exam-result/${StringUtil.convertSlugUrl(examResult.exam.title)}-id-${examResult.info.id}.html`} className='hover:underline'>{examResult.exam.title}</Link> </CardTitle>
                </CardHeader>
                <CardContent>
                    <Image src={examResult.exam.image_path} width={500} height={500} alt={examResult.exam.title} />
                </CardContent>
                <CardFooter className='grid grid-cols-2'>
                    <CardDescription>Point: {examResult.point}</CardDescription>
                    <CardDescription>Correct: {examResult.correct_count}/{examResult.exam.quizzes.length}</CardDescription>
                    <CardDescription>Level: {examResult.exam.exam_level}</CardDescription>
                    <CardDescription>Duration: {examResult.exam.duration} {examResult.exam.duration > 1 ? "minutes" : "minute"}</CardDescription>
                </CardFooter>
            </Card>)
            )}
        </div>
    )
}

export default ExamResultSearch; 