import AvatarElement from '@/components/common/AvatarElement'
import Confirm from '@/components/common/Confirm'
import CommentForm from '@/components/form/CommentForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import useIsOwner from '@/hooks/useIsOwn'
import { commentHooks } from '@/redux/api/commentApi'
import { CommentRequest } from '@/types/request/CommentRequest'
import { CommentResponse } from '@/types/response/CommentResponse'
import { handleMutation } from '@/util/mutation'
import Link from 'next/link'
import React, { useState } from 'react'
type Props = {
    comment: CommentResponse,
    blog_id: string,
    onDelete: () => void

}
const CommentItem = ({ comment, blog_id, onDelete }: Props) => {
    const [open, setOpen] = useState(false)
    const [updateComment, { isLoading }] = commentHooks.useUpdateCommentMutation()
    const [openConfirm, setOpenConfirm] = useState(false)
    const isOwner = useIsOwner(comment.author.id)
    const onSubmit = async (value: CommentRequest) => {
        if (isLoading) return
        await handleMutation(() => updateComment({ id: comment.id, body: value }).unwrap(), () => { setOpen(false) }, undefined, { error: "Update failed", success: "Update success" })
    }
    const isOpenForm = () => {
        if (open) return <CommentForm comment={comment} onSubmit={onSubmit} blog_id={blog_id} />
        return <>{comment.content}</>
    }
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <Link href={`/profile?id=${comment.author.id}`}><AvatarElement profile={comment.author} /></Link>
                    {isOwner &&
                        <div>
                            {open ?
                                <Button onClick={() => setOpen(false)}>Cancel</Button> :
                                <>
                                    <Button onClick={() => setOpen(true)} variant={"link"}>Edit</Button>
                                    <Button onClick={() => setOpenConfirm(true)} variant={"outline"}>Delete</Button>
                                </>
                            }
                        </div>
                    }
                </div>
            </CardHeader>
            <CardContent>
                {isOpenForm()}
            </CardContent>
            <CardFooter>{comment.created_at}</CardFooter>
            <Confirm onContinue={onDelete} onCancel={() => setOpenConfirm(false)} open={openConfirm} title={"Delete comment"} description={"Are you sure you want to delete this comment?"} />
        </Card >
    )
}

export default CommentItem