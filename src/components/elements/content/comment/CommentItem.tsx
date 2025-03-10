import AvatarElement from '@/components/elements/header/AvatarElement'
import Confirm from '@/components/elements/util/Confirm'
import CommentForm from '@/components/form/CommentForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { CommentService } from '@/services/CommentService'
import FunctionUtil from '@/util/FunctionUtil'
import Link from 'next/link'
import React, { useState } from 'react'
type Props = {
    comment: CommentResponse,
    isAuthor: boolean,
    blog_id: string,
    setCommentPage: React.Dispatch<React.SetStateAction<PageResponse<CommentResponse> | undefined>>
}
const CommentElement = ({ comment, isAuthor, blog_id, setCommentPage }: Props) => {
    const [open, setOpen] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const { toast } = useToast()
    const onSubmit = async (value: CommentRequest) => {
        try {
            console.log("log submit");
            const res = await CommentService.update(comment.info.id, value)
            if (res.success) {
                setCommentPage(prev => prev ? { ...prev, content: prev?.content.map(comment => comment.info.id === res.data.info.id ? res.data : comment) } : undefined)
                setOpen(false)
                toast({ title: "Update success" })
            }
        } catch (error) {
            toast({ title: "Update comment failed", description: FunctionUtil.showError(error), variant: "destructive" })
        }
    }
    const onDelete = () => {
        CommentService.delete(comment.info.id).then(res => {
            if (res.success) {
                setCommentPage(prev => prev ? { ...prev, content: prev.content?.filter(commentItem => comment.info.id !== commentItem.info.id) } : undefined)
                toast({ title: "Delete success" })
            } else {
                toast({ title: "Delete comment failed", description: res.message_error, variant: "destructive" })
            }
        })
    }
    const isOpenForm = () => {
        if (open) return <CommentForm comment={comment} onSubmit={onSubmit} blog_id={blog_id} />
        return <>{comment.content}</>
    }
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <Link href={`/profile?id=${comment.author.info.id}`}><AvatarElement account={comment.author} /></Link>
                    {isAuthor &&
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
            <CardFooter>{comment.info.created_at}</CardFooter>
            <Confirm onContinue={onDelete} onCancel={() => setOpenConfirm(false)} open={openConfirm} title={"Delete comment"} description={"Are you sure you want to delete this comment?"} />
        </Card >
    )
}

export default CommentElement