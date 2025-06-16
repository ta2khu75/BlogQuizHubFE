"use client"
import QuizCategoryCreate from '@/components/elements/content/admin/quiz-category/QuizCategoryCreate'
import QuizCategoryDelete from '@/components/elements/content/admin/quiz-category/QuizCategoryDelete'
import QuizCategoryTable from '@/components/elements/content/admin/quiz-category/QuizCategoryTable'
import QuizCategoryUpdate from '@/components/elements/content/admin/quiz-category/QuizCategoryUpdate'
import TitleElement from '@/components/elements/content/admin/TitleElement'
import { quizCategoryHooks } from '@/redux/api/quizCategoryApi'
import { QuizCategoryResponse } from '@/types/response/QuizCategoryResponse'
import React, { useState } from 'react'

const QuizCategoryAdminPage = () => {
    const { data } = quizCategoryHooks.useReadAllQuizCategoryQuery();
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [quizCategory, setQuizCategory] = useState<QuizCategoryResponse>()
    const quizCategories = data?.data || []
    const handleEditClick = (value: QuizCategoryResponse) => {
        setQuizCategory(value)
        setOpenEdit(true)
    }
    const handleDeleteClick = (value: QuizCategoryResponse) => {
        setQuizCategory(value)
        setOpenDelete(true)
    }
    return (
        <>
            <div className="flex justify-between">
                <TitleElement>Quiz Category Manager</TitleElement>
                <QuizCategoryCreate />
            </div>
            {quizCategory && <QuizCategoryUpdate open={openEdit} setOpen={setOpenEdit} quizCategory={quizCategory} />}
            {quizCategory && <QuizCategoryDelete open={openDelete} setOpen={setOpenDelete} quizCategory={quizCategory} />}
            <QuizCategoryTable array={quizCategories} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        </>
    )
}

export default QuizCategoryAdminPage