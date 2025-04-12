"use client"
import Modal from '@/components/elements/util/Modal'
import AccountInfoForm from '@/components/form/AccountInfoForm'
import AccountPasswordForm from '@/components/form/AccountPasswordForm'
import FollowList from '@/components/list/FollowList'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { useAppDispatch } from '@/redux/hooks'
import { AuthActions } from '@/redux/slice/authSlide'
import AccountService from '@/services/AccountService'
import AuthService from '@/services/AuthService'
import { FollowService } from '@/services/FollowService'
import FunctionUtil from '@/util/FunctionUtil'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useIsAuthor from '@/components/util/useIsAuthor'
import BlogSearch from '@/components/search/BlogSearch'
import QuizSearch from '@/components/search/QuizSearch'
import QuizResultSearch from '@/components/search/QuizResultSearch'
const ProfilePage = () => {
    const { toast } = useToast();
    const dispatch = useAppDispatch()
    const [disableFollow, setDisableFollow] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const tab = searchParams.get('tab') ?? 'blog'
    const pathname = usePathname();
    const [account, setAccount] = useState<AccountDetailsResponse>()
    const [openChangePassword, setOpenChangePassword] = useState(false)
    const [openChangeInfo, setOpenChangeInfo] = useState(false)
    const [isFollow, setIsFollow] = useState(false);
    const isAuthor = useIsAuthor()
    useEffect(() => {
        fetchAccount()
        fetchCheckFollow()
    }, [id])
    const onTabChange = (value: string) => {
        router.push(`${pathname}?id=${id}&tab=${value}`)
    }
    const fetchCheckFollow = () => {
        if (!id) return;
        FollowService.checkFollowing(id).then(res => {
            if (res.success) {
                setIsFollow(res.data.result)
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    const fetchFollow = () => {
        if (!id) return;
        setDisableFollow(true)
        FollowService.follow(id).then(res => {
            if (res.success) {
                setIsFollow(true)
                setDisableFollow(false)
                setAccount(prev => ({ ...prev!, follow_count: (prev?.follow_count ?? 0) + 1 }))
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    const fetchUnfollow = () => {
        if (!id) return;
        setDisableFollow(true)
        FollowService.unFollow(id).then(res => {
            if (res.success) {
                setIsFollow(false)
                setDisableFollow(false)
                setAccount(prev => ({ ...prev!, follow_count: (prev?.follow_count ?? 1) - 1 }))
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    const fetchAccount = () => {
        if (id) {
            AccountService.readById(id).then(res => {
                if (res.success) {
                    setAccount(res.data)
                    dispatch(AuthActions.setAccount(res.data))
                } else {
                    console.log(res.message_error);
                }
            }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
        }
    }
    const fetchChangePassword = async (data: AccountPasswordRequest) => {
        try {
            const res = await AuthService.changePassword(data)
            if (res.success) {
                toast({ title: "Change password success" })
                setOpenChangePassword(false)
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        } catch (err) {
            toast({ variant: "destructive", description: FunctionUtil.showError(err) })
        }
    }
    const fetchChangeInfo = async (data: AccountInfoRequest) => {
        try {
            const res = await AccountService.updateInfo(data)
            if (res.success) {
                toast({ title: "Change info success" });
                setOpenChangeInfo(false)
                dispatch(AuthActions.setAccount(res.data))
                setAccount(prev => { return { ...prev!, username: res.data.username, first_name: res.data.first_name, last_name: res.data.last_name, birthday: res.data.birthday } })
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        } catch (err) {
            toast({ variant: "destructive", description: FunctionUtil.showError(err) })
        }
    }
    return (
        <Tabs defaultValue={tab} onValueChange={(value) => onTabChange(value)}>
            <Card>
                <div className='flex flex-row justify-evenly items-center'>
                    {!isAuthor ? <Button disabled={disableFollow} onClick={isFollow ? fetchUnfollow : fetchFollow}>{isFollow ? "Unfollow" : "Follow"}</Button> : <div></div>}
                    <div>
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
                    </div>
                    <div className='flex flex-col gap-4'>
                        {isAuthor && <><Button onClick={() => setOpenChangePassword(true)}>Change password</Button><Button onClick={() => setOpenChangeInfo(true)}>Change info</Button></>}
                    </div>
                    {isAuthor && <>
                        <Modal open={openChangePassword} onCancel={() => setOpenChangePassword(false)} title="Change password">
                            <AccountPasswordForm onSubmit={fetchChangePassword} />
                        </Modal>
                        <Modal open={openChangeInfo} onCancel={() => setOpenChangeInfo(false)} title="Change password">
                            <AccountInfoForm account={account} onSubmit={fetchChangeInfo} />
                        </Modal>
                    </>}
                </div>
                <CardFooter className="flex justify-around">
                    <TabsList className={`grid w-full grid-cols-${isAuthor ? 4 : 3} h-16 lg:w-[150vh] md:w-[70vh]`}>
                        <TabsTrigger className='flex flex-col items-center' value="blog">
                            <CardTitle>
                                {account?.blog_count}
                            </CardTitle>
                            Blogs
                        </TabsTrigger>
                        <TabsTrigger className='flex flex-col items-center' value="quiz">
                            <CardTitle>
                                {account?.quiz_count}
                            </CardTitle>
                            Quizzes
                        </TabsTrigger>
                        <TabsTrigger className='flex flex-col items-center' value="follower">
                            <CardTitle>
                                {account?.follow_count}
                            </CardTitle>
                            Follower
                        </TabsTrigger>
                        {isAuthor &&
                            <TabsTrigger className='flex flex-col items-center p-4' value="quizResult">
                                Quiz result
                            </TabsTrigger>
                        }
                    </TabsList>
                </CardFooter>
            </Card>
            <TabsContent value="blog">
                <div className='flex justify-between'>
                    <CardTitle>Blog</CardTitle>
                    {isAuthor &&
                        <Button><Link href="/blog/create">Create</Link></Button>}
                </div>
                <BlogSearch />
            </TabsContent>
            <TabsContent value='quiz'>
                <div className='flex justify-between'>
                    <CardTitle>Quiz</CardTitle>
                    {isAuthor &&
                        <Button><Link href={"/quiz/create"}>Create</Link></Button>}
                </div>
                <QuizSearch />
            </TabsContent>
            <TabsContent value='follower'>
                <FollowList />
            </TabsContent>
            <TabsContent value='quizResult'>
                <QuizResultSearch />
            </TabsContent>
        </Tabs >
    )
}

export default ProfilePage