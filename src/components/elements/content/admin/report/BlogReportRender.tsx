import AvatarElement from '@/components/common/AvatarElement'
import { Badge } from '@/components/ui/badge'
import { CardTitle } from '@/components/ui/card'
import { BlogResponse } from '@/types/response/BlogResponse'
import Link from 'next/link'
import React from 'react'
type Props = {
    blog: BlogResponse,
    makeUrl: (profileId: number) => string

}
const BlogReportRender = ({ blog, makeUrl }: Props) => {
    return (
        <div className='flex flex-col gap-2'>
            <Link href={makeUrl(blog.author.id)}><AvatarElement profile={blog.author} /></Link>
            <CardTitle>
                {blog.title}
            </CardTitle>
            <div className='flex flex-wrap'>
                {blog.tags.map(tag => <Badge key={tag.id}>{tag.name}</Badge>)}
            </div>
        </div>
    )
}

export default BlogReportRender