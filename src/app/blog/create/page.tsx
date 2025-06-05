"use client"
import BlogForm from '@/components/form/BlogForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAppDispatch } from '@/redux/hooks'
import { ImageUrlsActions } from '@/redux/slice/imageUrlsSlide'
import { BlogService } from '@/services/BlogService'
import { BlogRequest } from '@/types/request/BlogRequest'
import FunctionUtil from '@/util/FunctionUtil'
import { handleMutation } from '@/util/mutation'
import { useRouter } from 'next/navigation'

const BlogCreatePage = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const onSubmit = async (data: BlogRequest) => {
        await fetchCreate(data)
        // await removeUnsetImage(data)
    }
    const removeUnsetImage = async (data: BlogRequest) => {
        const imageUrlsUse = FunctionUtil.getImageUrlFromContent(data.content)
        await dispatch(ImageUrlsActions.fetchUnsetRemove(imageUrlsUse))
    }
    const fetchCreate = async (data: BlogRequest) => {
        handleMutation(() => BlogService.create(data), (res) => {
            router.push(`/profile?id=${res.data.author.id}&tab=blog`)
        }, undefined, { error: "Create failed", success: "Create success" })
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