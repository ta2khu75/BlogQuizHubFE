import Modal from '@/components/common/Modal'
import QuizCategoryForm from '@/components/form/QuizCategoryForm'
import QuizCategoryService from '@/services/QuizCategoryService'
import { QuizCategoryRequest } from '@/types/request/QuizCategoryRequest'
import { handleMutation } from '@/util/mutation'
import StateHelpers from '@/util/StateHelpers'
import React, { Dispatch, SetStateAction } from 'react'
type Props = {
    setQuizCategories: Dispatch<SetStateAction<QuizCategoryResponse[]>>,
    quizCategory: QuizCategoryResponse,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}
const QuizCategoryUpdate = ({ setQuizCategories, quizCategory, open, setOpen }: Props) => {
    const onSubmit = (value: QuizCategoryRequest) => {
        handleMutation<QuizCategoryResponse>(
            () => QuizCategoryService.update(quizCategory.id, value),
            (res) => {
                StateHelpers.updateItemById(setQuizCategories, res.data)
                setOpen(false)
            },
            undefined,
            { success: 'Update success', error: 'Update failed' }
        )
    }
    return (
        <Modal open={open} onCancel={() => setOpen(false)} title="Update Account Status">
            <QuizCategoryForm
                onSubmit={onSubmit}
                quizCategory={quizCategory}
            />
        </Modal>
    )
}

export default QuizCategoryUpdate