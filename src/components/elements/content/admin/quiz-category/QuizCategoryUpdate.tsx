import Modal from '@/components/common/Modal'
import QuizCategoryForm from '@/components/form/QuizCategoryForm'
import { quizCategoryHooks } from '@/redux/api/quizCategoryApi'
import { QuizCategoryRequest } from '@/types/request/QuizCategoryRequest'
import { QuizCategoryResponse } from '@/types/response/QuizCategoryResponse'
import { handleMutation } from '@/util/mutation'
import React from 'react'
type Props = {
    quizCategory: QuizCategoryResponse,
    open: boolean,
    setOpen: (value: boolean) => void
}
const QuizCategoryUpdate = ({ quizCategory, open, setOpen }: Props) => {
    const [update, { isLoading }] = quizCategoryHooks.useUpdateQuizCategoryMutation()
    const onSubmit = async (value: QuizCategoryRequest) => {
        if (isLoading) return
        await handleMutation<QuizCategoryResponse>(
            () => update({ body: value, id: quizCategory.id }).unwrap(),
            () => setOpen(false),
            error => console.log(error),
            { success: 'Update success', error: 'Update failed' }
        )
    }
    return (
        <Modal open={open} setOpen={setOpen} title="Update Account Status">
            <QuizCategoryForm
                onSubmit={onSubmit}
                quizCategory={quizCategory}
            />
        </Modal>
    )
}

export default QuizCategoryUpdate