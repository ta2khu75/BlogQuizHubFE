import { serializeToHtml } from '@/components/elements/util/TextEditor/TextEditorConvert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Descendant } from 'slate'
type Props = {
    blog: BlogResponse
}
const BlogDetailElement = ({ blog }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-7xl text-center'>{blog?.title}</CardTitle>
                <CardTitle className='text-4xl text-center'>
                    Author:{blog?.author.username}
                </CardTitle>
                <CardTitle className='flex flex-wrap justify-center'>
                    {blog?.blog_tags.map(tag => <Badge key={tag} className='text-3xl'>{tag}</Badge>)}
                </CardTitle>
            </CardHeader>
            {
                blog?.content &&
                <CardContent className="my-4" dangerouslySetInnerHTML={{ __html: (JSON.parse(blog.content) as Descendant[]).map(n => serializeToHtml(n)).join("") }}></CardContent>
            }
        </Card>
    )
}

export default BlogDetailElement