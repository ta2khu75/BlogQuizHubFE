"use client"
import AvatarElement from '@/components/common/AvatarElement'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import useIsAuthor from '@/components/util/useIsAuthor'
import StringUtil from '@/util/StringUtil'
import Link from 'next/link'
type Props = {
    blogPage: PageResponse<BlogResponse> | undefined
}
const BlogList = ({ blogPage }: Props) => {
    const isAuthor = useIsAuthor()
    return (
        <div className='flex flex-col gap-4'>
            {
                blogPage?.content?.map(blog => (
                    <Card key={blog.info.id}>
                        <CardHeader className='flex flex-row justify-between items-center'>
                            <Link href={`/profile?id=${blog.author.id}`}><AvatarElement account={blog.author} /></Link>
                            {
                                isAuthor &&
                                <>
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
                                {blog.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
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