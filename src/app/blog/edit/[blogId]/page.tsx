"use client"
import BlogForm from '@/components/form/BlogForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAppDispatch } from '@/redux/hooks'
import { ImageUrlsActions } from '@/redux/slice/imageUrlsSlide'
import { BlogService } from '@/services/BlogService'
import FunctionUtil from '@/util/FunctionUtil'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

const BlogEditPage = ({ params }: { params: Promise<{ blogId: string }> }) => {
    const router = useRouter()
    const { toast } = useToast()
    const { blogId } = use(params)
    const [blog, setBlog] = useState<BlogResponse>();
    const dispatch = useAppDispatch()
    useEffect(() => {
        fetchBlog()
    }, [blogId])
    const fetchBlog = () => {
        BlogService.readDetails(blogId).then(res => {
            if (res.success) {
                setBlog(res.data)
                const imageUrlsUse = FunctionUtil.getImageUrlFromContent(res.data.content)
                imageUrlsUse.forEach(imageUrl => {
                    dispatch(ImageUrlsActions.add(imageUrl))
                })
            } else {
                console.log(res.message_error)
            }
        }).catch(err =>
            toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    const removeUnsetImage = async (data: BlogRequest) => {
        const imageUrlsUse = FunctionUtil.getImageUrlFromContent(data.content)
        dispatch(ImageUrlsActions.fetchUnsetRemove(imageUrlsUse));
    }
    const onSubmit = async (data: BlogRequest) => {
        await fetchUpdate(data)
        await removeUnsetImage(data)
    }
    const fetchUpdate = async (data: BlogRequest) => {
        try {
            const res = await BlogService.update(blogId, data)
            if (res.success) {
                toast({ title: "Update success" })
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
                <BlogForm blog={blog} onSubmit={onSubmit} />
            </CardContent>
        </Card>
    )
}

export default BlogEditPage 