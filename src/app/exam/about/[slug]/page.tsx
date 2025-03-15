"use client"
import { Button } from '@/components/ui/button'
import { CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAppSelector } from '@/redux/hooks'
import ExamService from '@/services/ExamService'
import FunctionUtil from '@/util/FunctionUtil'
import StringUtil from '@/util/StringUtil'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect, useMemo, useState } from 'react'

const ExamAboutPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params)
    const { toast } = useToast()
    const examId = useMemo(() => StringUtil.getIdFromSlugUrl(slug), [slug])
    const [exam, setExam] = useState<ExamResponse>()
    const auth = useAppSelector(state => state.auth)
    const isAuthor = useMemo(() => auth.account?.info.id === exam?.author.info.id, [auth.account?.info.id, exam?.author.info.id])
    useEffect(() => {
        fetchExam()
    }, [examId])
    const fetchExam = () => {
        ExamService.readDetailById(examId).then(res => {
            if (res.success) {
                setExam(res.data)
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    return (
        // <Card className='w-full'>
        //     <CardHeader>
        //         <CardTitle className='text-7xl text-center'>{exam?.title}</CardTitle>
        //         <CardTitle className='text-4xl text-center'>
        //             Author:<Link href={"/profile?id=" + exam?.author.info.id} className={"hover:underline"}> {exam?.author.username}</Link>
        //         </CardTitle>
        //         {isAuthor && <CardDescription className='text-2xl text-center'>{exam?.access_modifier}</CardDescription>}
        //         <CardDescription className='flex justify-center gap-6'>
        //             <p>Duration: {exam?.duration} minutes</p>
        //             <p>Level: {exam?.exam_level}</p>
        //             <p>Status: {exam?.exam_status}</p>
        //         </CardDescription>
        //     </CardHeader>
        //     <CardContent>
        //         {exam?.image_path &&
        //             <>
        //                 <Image className='w-full md:hidden' src={exam?.image_path} alt={exam?.title} width={500} height={500} />
        //                 <Image className='w-full' src={exam?.image_path} alt={exam?.title ?? ""} width={1000} height={1000} />
        //             </>

        //         }
        //         <p>
        //             {exam?.description}
        //         </p>
        //     </CardContent>
        //     <CardFooter className='justify-center'>
        //         <Link href={`/exam/detail/${StringUtil.convertSlugUrl(exam?.title ?? "")}-id-${exam?.info.id}`}><Button>Start Exam</Button></Link>
        //     </CardFooter>
        // </Card >
        <div className='grid grid-cols-1 md:grid-cols-2 mt-8'>
            <div className='flex flex-col justify-center'>
                <h1 className='text-6xl font-bold'>{exam?.title}</h1>
                <h2 className='text-2xl'>Author: <Link href={`/profile?id=${exam?.author.info.id}`} className='hover:underline'>{exam?.author.username}</Link></h2>
                {isAuthor && <h3 className='text-2xl'>{exam?.access_modifier}</h3>}
                <p>Duration: {exam?.duration} minutes</p>
                <p>Level: {exam?.exam_level} minutes</p>
                <p>Status: {exam?.exam_status}</p>
                <CardDescription className='description'>{exam?.description}</CardDescription>
                <Link href={`/exam/detail/${StringUtil.convertSlugUrl(exam?.title ?? "")}-id-${exam?.info.id}`}><Button>Start Exam</Button></Link>
            </div>
            {
                exam?.image_path &&
                <Image className='w-full' src={exam?.image_path} alt={exam?.title ?? ""} width={1000} height={1000} />
            }
        </div >
    )
}

export default ExamAboutPage