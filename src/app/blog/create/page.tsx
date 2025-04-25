"use client"
import BlogForm from '@/components/form/BlogForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAppDispatch } from '@/redux/hooks'
import { ImageUrlsActions } from '@/redux/slice/imageUrlsSlide'
import { BlogService } from '@/services/BlogService'
import FunctionUtil from '@/util/FunctionUtil'
import { useRouter } from 'next/navigation'

const BlogCreatePage = () => {
    const { toast } = useToast()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const onSubmit = async (data: BlogRequest) => {
        await fetchCreate(data)
        await removeUnsetImage(data)
    }
    const removeUnsetImage = async (data: BlogRequest) => {
        const imageUrlsUse = FunctionUtil.getImageUrlFromContent(data.content)
        await dispatch(ImageUrlsActions.fetchUnsetRemove(imageUrlsUse))
    }
    const fetchCreate = async (data: BlogRequest) => {
        try {
            const res = await BlogService.create(data)
            if (res.success) {
                toast({ title: "Create success" })
                router.push(`/profile?id=${res.data.author.id}&tab=blog`)
            } else {
                toast({ title: "Create failed", description: res.message, variant: "destructive" })
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