import Paginator from '@/components/common/Paginator'
import CommentElement from '@/components/elements/content/comment/CommentItem'
import { commentHooks } from '@/redux/api/commentApi'
import { CommentResponse } from '@/types/response/CommentResponse'
import { PageResponse } from '@/types/response/PageResponse'
import { handleMutation } from '@/util/mutation'
import React from 'react'
type Props = {
    commentPage?: PageResponse<CommentResponse>
    blog_id: string
}
const CommentPagination = ({ commentPage, blog_id }: Props) => {
    const [deleteComment, { isLoading }] = commentHooks.useDeleteCommentMutation();
    const onDelete = async (commentId: string) => {
        if (isLoading) return
        await handleMutation(() => deleteComment(commentId), () => { }, undefined, { error: "Delete failed", success: "Delete success" })
    }
    return (
        <div className='w-full'>
            {
                commentPage?.content?.map(comment => <CommentElement onDelete={() => onDelete(comment.id)} blog_id={blog_id} key={comment?.id} comment={comment} />)
            }
            {
                commentPage && <Paginator page={commentPage} />
            }
        </div>
    )
}

export default CommentPagination