"use client"
import AvatarElement from '@/components/elements/header/AvatarElement'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
// import { useAppSelector } from '@/redux/hooks'
import { BlogService } from '@/services/BlogService'
import FunctionUtil from '@/util/FunctionUtil'
import StringUtil from '@/util/StringUtil'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const size = 10
type Props = {
    isAuthor: boolean
}
const BlogList = ({ isAuthor }: Props) => {
    const { toast } = useToast()
    // const auth = useAppSelector(state => state.auth);
    const searchParams = useSearchParams()
    const authorId = searchParams.get("id")
    const [blogPage, setBlogPage] = useState<PageResponse<BlogResponse>>()
    useEffect(() => {
        fetchSearchBlog()
    }, [authorId])
    const fetchSearchBlog = () => {
        BlogService.search({ page: 1, size, authorId: authorId ?? undefined }).then(res => {
            if (res.success) {
                setBlogPage(res.data);
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    return (
        <div className='flex flex-col gap-4'>
            {
                blogPage?.content?.map(blog => (
                    <Card key={blog.info.id}>
                        <CardHeader className='flex flex-row justify-between items-center'>
                            <Link href={`/profile?id=${blog.author.info.id}`}><AvatarElement account={blog.author} /></Link>
                            {isAuthor && <>
                                {blog.access_modifier}
                                <Button variant={"link"}><Link href={`/blog/edit/${blog.info.id}`}>Edit</Link></Button>
                            </>
                            }
                        </CardHeader>
                        <CardContent className='flex flex-col gap-y-2'>
                            <CardTitle>
                                <Link href={`/blog/${StringUtil.convertSlugUrl(blog.title)}-id-${blog.info.id}.html`} className={"hover:underline"}>{blog.title}</Link>
                            </CardTitle>
                            <div className='flex flex-wrap'>
                                {blog.blog_tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                            </div>
                        </CardContent>
                        <CardFooter className='flex gap-x-4'>
                            <CardDescription>Count:{blog.view_count}</CardDescription>
                            <CardDescription>Comment:{blog.comment_count}</CardDescription>
                        </CardFooter>
                    </Card>
                )
                )
            }
        </div>
    )
}

export default BlogList 