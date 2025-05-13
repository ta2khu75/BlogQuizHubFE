import Modal from '@/components/common/Modal'
import QuizCategoryForm from '@/components/form/QuizCategoryForm'
import { Button } from '@/components/ui/button'
import QuizCategoryService from '@/services/QuizCategoryService'
import { QuizCategoryRequest } from '@/types/request/QuizCategoryRequest'
import { handleMutation } from '@/util/mutation'
import StateHelpers from '@/util/StateHelpers'
import React, { Dispatch, SetStateAction, useState } from 'react'
type Props = {
    setQuizCategories: Dispatch<SetStateAction<QuizCategoryResponse[]>>,
}
const QuizCategoryCreate = ({ setQuizCategories }: Props) => {
    const [open, setOpen] = useState(false)
    const onSubmit = (value: QuizCategoryRequest) => {
        console.log(value);
        handleMutation<QuizCategoryResponse>(
            () => QuizCategoryService.create(value),
            (response) => {
                setOpen(false)
                StateHelpers.prependState<RoleResponse>(setQuizCategories, response.data)
            }, undefined,
            { success: 'Create success', error: 'Create failed' })
    }
    return (
        <>
            <Button onClick={() => setOpen(true)}>Create</Button>
            <Modal open={open} onCancel={() => setOpen(false)} title="Create Account">
                <QuizCategoryForm onSubmit={onSubmit} />
            </Modal>
        </>
    )
}

export default QuizCategoryCreate 