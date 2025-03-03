"use client"
import AvatarElement from '@/components/elements/header/AvatarElement'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAppSelector } from '@/redux/hooks'
import { BlogService } from '@/services/BlogService'
import FunctionUtil from '@/util/FunctionUtil'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const size = 10
const BlogSearch = () => {
    const { toast } = useToast()
    const auth = useAppSelector(state => state.auth);
    const searchParams = useSearchParams()
    const authorId = searchParams.get("id")
    const [blogPage, setBlogPage] = useState<PageResponse<BlogResponse>>()
    useEffect(() => {
        fetchSearchBlog()
    }, [authorId])
    const fetchSearchBlog = () => {
        if (auth.authenticated && auth.account?.info.id === authorId) {
            BlogService.mySearch({ page: 1, size }).then(res => {
                if (res.success) {
                    setBlogPage(res.data)
                } else {
                    toast({ variant: "destructive", description: res.message_error })
                }
            }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
        } else {
            BlogService.search({ page: 1, size, authorId: authorId ?? undefined }).then(res => {
                if (res.success) {
                    setBlogPage(res.data);
                }
            })
        }
    }
    return (
        <div>
            {auth.authenticated && auth.account?.info.id === authorId ? "true" : "false"}
            {
                blogPage?.content?.map(blog => (
                    <Card key={blog.info.id}>
                        <CardHeader>
                            <CardTitle>
                                <Link href={"/profile?id="}><AvatarElement account={blog.author} /></Link>
                            </CardTitle>
                            <p>{blog.title}</p>
                        </CardHeader>
                        <CardContent className='flex gap-x-4'>
                            {blog.blog_tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                        </CardContent>
                        <CardFooter className='flex gap-x-4'>
                            <CardDescription>Count:{blog.view_count}</CardDescription>
                            <CardDescription>comment:{blog.comment_count}</CardDescription>
                        </CardFooter>
                    </Card>
                )
                )
            }
        </div>
    )
}

export default BlogSearch