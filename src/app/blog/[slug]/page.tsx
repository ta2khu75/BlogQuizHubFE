"use client"
import CommentPagination from '@/components/elements/content/comment/CommentPagination';
import { serializeToHtml } from '@/components/elements/util/TextEditor/TextEditorConvert';
import CommentForm from '@/components/form/CommentForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useAppSelector } from '@/redux/hooks';
import { BlogService } from '@/services/BlogService';
import { CommentService } from '@/services/CommentService';
import FunctionUtil from '@/util/FunctionUtil';
import StringUtil from '@/util/StringUtil';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { use, useEffect, useMemo, useState } from 'react'
import { Descendant } from 'slate';

const BlogAboutPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { toast } = useToast()
    const { slug } = use(params)
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const [openComment, setOpenComment] = useState(false)
    const auth = useAppSelector(state => state.auth)
    const blog_id = useMemo(() => StringUtil.getIdFromSlugUrl(slug), [slug])
    const [commentPage, setCommentPage] = useState<PageResponse<CommentResponse>>();
    const [blog, setBlog] = useState<BlogDetailsResponse>();
    useEffect(() => {
        fetchBlog()
        fetchPageComment()
    }, [blog_id])
    useEffect(() => {
        fetchPageComment()
    }, [page])
    const fetchBlog = () => {
        BlogService.readDetails(blog_id).then(res => {
            if (res.success) {
                setBlog(res.data)
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => (
            toast({ variant: "destructive", description: FunctionUtil.showError(err) })
        ))
    }
    const fetchPageComment = () => {
        CommentService.readPageByBlog(blog_id, page).then(res => {
            if (res.success) {
                setCommentPage(res.data)
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }

    const fetchCreateComment = async (value: CommentRequest) => {
        try {
            const res = await CommentService.create(value)
            if (res.success) {
                toast({ title: "Create success" })
                setCommentPage(prev => prev ? { ...prev, total_elements: prev.total_elements + 1, content: [res.data, ...prev.content ?? []] } : undefined)
            }
        } catch (error) {
            toast({ title: "Create comment failed", description: FunctionUtil.showError(error), variant: "destructive" })
        }
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className='text-7xl text-center'>{blog?.title}</CardTitle>
                    <CardTitle className='text-4xl text-center'>
                        Author:<Link href={"/profile?id=" + blog?.author.info.id} className={"hover:underline"}> {blog?.author.username}</Link>
                    </CardTitle>
                    <CardTitle className='flex flex-wrap justify-center'>
                        {blog?.blog_tags.map(tag => <Badge key={tag} className='text-3xl'><Link href={"/blog/search?tag=" + tag}>{tag}</Link></Badge>)}
                    </CardTitle>
                </CardHeader>
                {
                    blog?.content &&
                    <CardContent className="my-4" dangerouslySetInnerHTML={{ __html: (JSON.parse(blog.content) as Descendant[]).map(n => serializeToHtml(n)).join("") }}></CardContent>
                }
                <CardFooter className='flex flex-col'>
                    <div className='w-full mb-4'>
                        <CardTitle>
                            <span className='mr-4'>Comment ({commentPage?.total_elements})</span>
                            {!openComment &&
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button onClick={() => setOpenComment(true)}><Plus /></Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Add comment</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            }
                        </CardTitle>
                        {openComment && <CommentForm blog_id={blog_id} onSubmit={fetchCreateComment} />}
                    </div>
                    <CommentPagination commentPage={commentPage} blog_id={blog_id} setCommentPage={setCommentPage} auth={auth} />
                </CardFooter>
            </Card>
        </div>
    )
}

export default BlogAboutPage