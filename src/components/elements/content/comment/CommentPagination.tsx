import CommentElement from '@/components/elements/content/comment/CommentItem'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import React from 'react'
type Props = {
    commentPage?: PageResponse<CommentResponse>
    blog_id: string
    auth: AuthResponse
    setCommentPage: React.Dispatch<React.SetStateAction<PageResponse<CommentResponse> | undefined>>
}
const CommentPagination = ({ commentPage, blog_id, auth, setCommentPage }: Props) => {
    return (
        <div className='w-full'>
            {
                commentPage?.content?.map(comment => <CommentElement blog_id={blog_id} key={comment?.info.id} setCommentPage={setCommentPage} isAuthor={comment?.author?.info?.id === auth.account?.info.id} comment={comment} />)
            }
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default CommentPagination