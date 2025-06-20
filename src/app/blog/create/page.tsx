"use client"
import BlogForm from '@/components/form/BlogForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { blogHooks } from '@/redux/api/blogApi'
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
    const [createBlog, { isLoading }] = blogHooks.useCreateBlogMutation()
    const onSubmit = async (data: BlogRequest) => {
        if (isLoading) return
        await handleMutation(() => createBlog({ body: data }).unwrap(), () => {
            router.push("/profile")
        }, undefined, { error: "Create failed", success: "Create success" })
        // await fetchCreate(data)
        // await removeUnsetImage(data)
    }
    const removeUnsetImage = async (data: BlogRequest) => {
        const imageUrlsUse = FunctionUtil.getImageUrlFromContent(data.content)
        await dispatch(ImageUrlsActions.fetchUnsetRemove(imageUrlsUse))
    }
    // const fetchCreate = async (data: BlogRequest) => {
    //     handleMutation(() => BlogService.create(data), (res) => {
    //         router.push(`/profile?id=${res.data.author.id}&tab=blog`)
    //     }, undefined, { error: "Create failed", success: "Create success" })
    // }

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