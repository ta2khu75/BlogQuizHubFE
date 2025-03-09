"use client"
import BlogForm from '@/components/form/BlogForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { BlogService } from '@/services/BlogService'
import FunctionUtil from '@/util/FunctionUtil'
import { useRouter } from 'next/navigation'

const BlogCreatePage = () => {
    const { toast } = useToast()
    const router = useRouter()
    const onSubmit = (data: BlogRequest) => {
        fetchCreate(data)
    }
    const fetchCreate = async (data: BlogRequest) => {
        try {
            const res = await BlogService.create(data)
            if (res.success) {
                toast({ title: "Create success" })
                localStorage.removeItem("content")
                router.push(`/profile?id=${res.data.author.info.id}&tab=blog`)
            } else {
                toast({ title: "Create failed", description: res.message_error, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Create failed", description: FunctionUtil.showError(error), variant: "destructive" })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create blog</CardTitle>
            </CardHeader>
            <CardContent>
                <BlogForm onSubmit={onSubmit} />
            </CardContent>
        </Card>
    )
}

export default BlogCreatePage