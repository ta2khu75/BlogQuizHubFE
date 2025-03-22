"use client"
import BlogForm from '@/components/form/BlogForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { BlogService } from '@/services/BlogService'
import FunctionUtil from '@/util/FunctionUtil'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

const BlogEditPage = ({ params }: { params: Promise<{ blogId: string }> }) => {
    const router = useRouter()
    const { toast } = useToast()
    const { blogId } = use(params)
    const [blog, setBlog] = useState<BlogResponse>();
    useEffect(() => {
        fetchBlog()
    }, [blogId])
    const fetchBlog = () => {
        BlogService.readDetails(blogId).then(res => {
            if (res.success) {
                setBlog(res.data)
            } else {
                console.log(res.message_error)
            }
        }).catch(err =>
            toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    const onSubmit = (data: BlogRequest) => {
        fetchUpdate(data)
    }
    const fetchUpdate = async (data: BlogRequest) => {
        try {
            const res = await BlogService.update(blogId, data)
            if (res.success) {
                toast({ title: "Update success" })
                localStorage.removeItem("content")
                router.push(`/profile?id=${res.data.author.info.id}&tab=blog`)
            } else {
                toast({ title: "Update failed", description: res.message_error, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Update failed", description: FunctionUtil.showError(error), variant: "destructive" })
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Update blog</CardTitle>
            </CardHeader>
            <CardContent>
                <BlogForm blog={blog} isEdit={true} onSubmit={onSubmit} />
            </CardContent>
        </Card>
    )
}

export default BlogEditPage 