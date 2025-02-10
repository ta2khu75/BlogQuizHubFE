import AvatarElement from '@/components/elements/header/AvatarElement';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAppSelector } from '@/redux/hooks';
import ExamService from '@/services/ExamService';
import FunctionUtil from '@/util/FunctionUtil';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
const size = 10
const ExamSearch = () => {
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
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
            {examPage?.content?.map(exam =>
            (<Card key={exam.info.id}>
                <CardHeader>
                    <CardTitle>
                        <Link href={"/profile?id="}><AvatarElement account={exam.author} /></Link>
                    </CardTitle>
                    <p>{exam.title}</p>
                    <CardDescription>{exam.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image src={exam.image_path} alt={exam.title} />
                </CardContent>
                <CardFooter>
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