import Modal from '@/components/common/Modal'
import QuizCategoryForm from '@/components/form/QuizCategoryForm'
import { Button } from '@/components/ui/button'
import { quizCategoryHooks } from '@/redux/api/quizCategoryApi'
import { QuizCategoryRequest } from '@/types/request/QuizCategoryRequest'
import { QuizCategoryResponse } from '@/types/response/QuizCategoryResponse'
import { handleMutation } from '@/util/mutation'
import React from 'react'
const QuizCategoryCreate = () => {
    const [create, { isLoading }] = quizCategoryHooks.useCreateQuizCategoryMutation()
    const [open, setOpen] = React.useState(false)
    const onSubmit = async (value: QuizCategoryRequest) => {
        if (isLoading) return;
        await handleMutation<QuizCategoryResponse>(
            () => create(value).unwrap(),
            () => setOpen(false),
            error => console.log(error),
            { success: 'Create success', error: 'Create failed' })
    }
    return (
        <>
            <Button onClick={() => setOpen(true)}>Create</Button>
            <Modal open={open} setOpen={setOpen} title="Create Account">
                <QuizCategoryForm onSubmit={onSubmit} />
            </Modal>
        </>
    )
}

export default QuizCategoryCreate 