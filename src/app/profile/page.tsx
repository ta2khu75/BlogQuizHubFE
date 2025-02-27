"use client"
import BlogSearch from '@/components/search/BlogSearch'
import ExamSearch from '@/components/search/ExamSearch'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { useAppSelector } from '@/redux/hooks'
import AccountService from '@/services/AccountService'
import FunctionUtil from '@/util/FunctionUtil'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const ProfilePage = () => {
    const { toast } = useToast();
    const router = useRouter()
    const searchParams = useSearchParams()
    const auth = useAppSelector(state => state.auth.account);
    const [account, setAccount] = useState<AccountDetailsResponse>()
    const id = searchParams.get('id')
    const tab = searchParams.get('tab') ?? 'blog'
    const pathname = usePathname();
    const isAuthor = () => {
        return account?.info.id === auth?.info.id
    }
    useEffect(() => {
        fetchAccount()
    }, [id])
    const onTabChange = (value: string) => {
        router.push(`${pathname}?id=${id}&tab=${value}`)
    }
    const fetchAccount = () => {
        if (id) {
            AccountService.readById(id).then(res => {
                if (res.success) {
                    setAccount(res.data)
                } else {
                    console.log(res.message_error);
                }
            }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
        }
    }
    return (
        <Tabs defaultValue={tab} onValueChange={(value) => onTabChange(value)}>
            <Card>
                <CardHeader className='flex flex-col items-center'>
                    <CardTitle>
                        <Avatar>
                            <AvatarFallback>
                                {account?.username[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </CardTitle>
                    <CardTitle>
                        {account?.username}
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col items-center'>
                    <CardDescription>
                        First name: {account?.first_name}
                    </CardDescription>
                    <CardDescription>
                        Last name: {account?.last_name}
                    </CardDescription>
                    <CardDescription>
                        Birthday: {account?.birthday}
                    </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-around">
                    <TabsList className={`grid w-full grid-cols-3 h-16 lg:w-[150vh] md:w-[70vh]`}>
                        <TabsTrigger className='flex flex-col items-center' value="blog">
                            <CardTitle>
                                {account?.blog_count}
                            </CardTitle>
                            Blogs
                        </TabsTrigger>
                        <TabsTrigger className='flex flex-col items-center' value="exam">
                            <CardTitle>
                                {account?.exam_count}
                            </CardTitle>
                            Exams
                        </TabsTrigger>
                        <TabsTrigger className='flex flex-col items-center' value="follower">
                            <CardTitle>
                                {account?.follow_count}
                            </CardTitle>
                            Follower
                        </TabsTrigger>
                        {/* {isAuthor() &&
                            <TabsTrigger className='flex flex-col items-center' value="Exam result">
                                Exam result
                            </TabsTrigger>
                        } */}
                    </TabsList>
                </CardFooter>
            </Card>
            <TabsContent value="blog">
                <div className='flex justify-between'>
                    <CardTitle>Blog</CardTitle>
                    {isAuthor() &&
                        <Button><Link href="/blog/create">Create</Link></Button>}
                </div>
                <BlogSearch />
            </TabsContent>
            <TabsContent value='exam'>
                <div className='flex justify-between'>
                    <CardTitle>Exam</CardTitle>
                    {isAuthor() &&
                        <Button><Link href={"/exam/create"}>Create</Link></Button>}
                </div>
                <ExamSearch isAuthor={isAuthor()} />
            </TabsContent>
            <TabsContent value='follower'>
                follow
            </TabsContent>
        </Tabs >
    )
}

export default ProfilePage