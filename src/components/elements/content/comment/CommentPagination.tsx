import CommentElement from '@/components/elements/content/comment/CommentItem'
import Pageination from '@/components/elements/util/Pageination'
import { useToast } from '@/hooks/use-toast'
import { CommentService } from '@/services/CommentService'
import React from 'react'
type Props = {
    commentPage?: PageResponse<CommentResponse>
    blog_id: string
    auth: AuthResponse
    setCommentPage: React.Dispatch<React.SetStateAction<PageResponse<CommentResponse> | undefined>>
}
const CommentPagination = ({ commentPage, blog_id, auth, setCommentPage }: Props) => {
    const { toast } = useToast()
    const onDelete = (commentId: string) => {
        CommentService.delete(commentId).then(res => {
            if (res.success) {
                setCommentPage(prev => prev ? { ...prev, total_elements: prev.total_elements - 1, content: prev.content?.filter(commentItem => commentId !== commentItem.info.id) } : undefined)
                toast({ title: "Delete success" })
            } else {
                toast({ title: "Delete comment failed", description: res.message_error, variant: "destructive" })
            }
        })
    }
    return (
        <div className='w-full'>
            {
                commentPage?.content?.map(comment => <CommentElement onDelete={() => onDelete(comment.info.id)} blog_id={blog_id} key={comment?.info.id} setCommentPage={setCommentPage} isAuthor={comment?.author?.info?.id === auth.account?.info.id} comment={comment} />)
            }
            {
                commentPage && <Pageination<CommentResponse> page={commentPage} />
            }
        </div>
    )
}

export default CommentPagination