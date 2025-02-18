import AvatarElement from '@/components/elements/header/AvatarElement';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAppSelector } from '@/redux/hooks';
import ExamService from '@/services/ExamService';
import { ExamStatus } from '@/types/ExamStatus';
import FunctionUtil from '@/util/FunctionUtil';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
const size = 10
type Props = {
    isAuthor: boolean
}
const ExamSearch = ({ isAuthor }: Props) => {
    const { toast } = useToast()
    const auth = useAppSelector(state => state.auth);
    const searchParams = useSearchParams()
    const authorId = searchParams.get("id")
    const [examPage, setExamPage] = useState<PageResponse<ExamResponse>>()
    useEffect(() => {
        fetchSearchBlog()
    }, [authorId])
    const fetchSearchBlog = () => {
        if (auth.authenticated && auth.account?.info.id === authorId) {
            ExamService.mySearch({ page: 1, size }).then(res => {
                if (res.success) {
                    setExamPage(res.data)
                } else {
                    toast({ variant: "destructive", description: res.message_error })
                }
            }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
        } else {
            ExamService.search({ page: 1, size, authorId: authorId ?? undefined }).then(res => {
                if (res.success) {
                    setExamPage(res.data);
                }
            })
        }
    }
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {examPage?.content?.map(exam =>
            (<Card key={exam.info.id}>
                <CardHeader>
                    <div className='flex justify-between'>
                        <Link href={`/profile?id=${exam.author.info.id}`}><AvatarElement account={exam.author} /></Link>
                        {isAuthor && exam.exam_status === ExamStatus.NOT_COMPLETED && <Button variant={"link"}><Link href={`/exam/edit/${exam.info.id}`}>Edit</Link></Button>}
                    </div>
                    <CardTitle>{exam.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Image src={exam.image_path} width={500} height={500} alt={exam.title} />
                </CardContent>
                <CardFooter className='grid grid-cols-2'>
                    <CardDescription>Category: {exam.exam_category.name}</CardDescription>
                    <CardDescription>Duration: {exam.duration}</CardDescription>
                    <CardDescription>Level: {exam.exam_level}</CardDescription>
                    <CardDescription>Status: {exam.exam_status}</CardDescription>
                </CardFooter>
            </Card>)
            )}
        </div>
    )
}

export default ExamSearch