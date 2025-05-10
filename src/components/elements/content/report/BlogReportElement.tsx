import AvatarElement from '@/components/common/AvatarElement'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
type Props = {
    blog: BlogResponse
}
const BlogReportElement = ({ blog }: Props) => {
    return (

        <Card key={blog.id}>
            <CardHeader className='flex flex-row justify-between items-center'>
                <Link href={`/profile?id=${blog.author.info.id}`}><AvatarElement profile={blog.author} /></Link>
            </CardHeader>
            <CardContent className='flex flex-col gap-y-2'>
                <CardTitle>
                    {blog.title}
                </CardTitle>
                <div className='flex flex-wrap'>
                    {blog.tags.map(tag => <Badge key={tag.id}>{tag.name}</Badge>)}
                </div>
            </CardContent>
        </Card>
    )
}

export default BlogReportElement