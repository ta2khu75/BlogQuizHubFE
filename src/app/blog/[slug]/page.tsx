"use client"
import CommentPagination from '@/components/elements/content/comment/CommentPagination';
// import { serializeToHtml } from '@/components/elements/util/TextEditor/TextEditorConvert';
import CommentForm from '@/components/form/CommentForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { Descendant } from 'slate';
import { blogHooks } from '@/redux/api/blogApi';
import ParseHelper from '@/util/ParseHelper';
import useAuth from '@/hooks/useIsAuth';
import { handleMutation } from '@/util/mutation';
import { CommentRequest } from '@/types/request/CommentRequest';
type Props = {
    id: string
}
const BlogDetailPage = ({ id }: Props) => {
    const searchParams = useSearchParams()
    const page = useMemo(() => ParseHelper.parseNumber(searchParams.get("page")), [searchParams])
    const [openComment, setOpenComment] = useState(false)
    const { data: blogData } = blogHooks.useReadBlogQuery(id, { skip: !id })
    const { data: commentData } = blogHooks.useReadBlogCommentQuery({ id, search: { page } }, { skip: !id })
    const blog = blogData?.data
    const commentPage = commentData?.data
    const [createComment, { isLoading }] = blogHooks.useCreateBlogCommentMutation()
    const auth = useAuth()
    // useEffect(() => {
    //     fetchPageComment()
    // }, [blogId])
    // useEffect(() => {
    //     fetchPageComment()
    // }, [page])
    // const fetchPageComment = () => {
    //     CommentService.readPageByBlog(blogId, page).then(res => {
    //         if (res.success) {
    //             setCommentPage(res.data)
    //         } else {
    //             toast({ variant: "destructive", description: res.message })
    //         }
    //     }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    // }

    const fetchCreateComment = async (value: CommentRequest) => {
        if (!auth || isLoading) return
        await handleMutation(() => createComment({ id, body: value }).unwrap(), () => setOpenComment(false), undefined, { error: "Create failed", success: "Create success" })
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className='text-7xl text-center'>{blog?.title}</CardTitle>
                    <CardTitle className='text-4xl text-center'>
                        Author:<Link href={"/profile?id=" + blog?.author.id} className={"hover:underline"}> {blog?.author.display_name}</Link>
                    </CardTitle>
                    <CardTitle className='flex flex-wrap justify-center'>
                        {blog?.tags.map(tag => <Badge key={tag.id} className='text-3xl'><Link href={"/blog/search?tag=" + tag}>{tag.name}</Link></Badge>)}
                    </CardTitle>
                </CardHeader>
                {/* {
                    blog?.content &&
                    <CardContent className="my-4" dangerouslySetInnerHTML={{ __html: (JSON.parse(blog.content) as Descendant[]).map(n => serializeToHtml(n)).join("") }}></CardContent>
                } */}
                {/* <ReportElement targetId={blogId} targetType={TargetType.BLOG} /> */}
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
                        {openComment && <CommentForm blog_id={id} onSubmit={fetchCreateComment} />}
                    </div>
                    <CommentPagination commentPage={commentPage} blog_id={id} />
                </CardFooter>
            </Card>
        </div>
    )
}

export default BlogDetailPage;