"use client"
import QuizCategoryCreate from '@/components/elements/content/admin/quiz-category/QuizCategoryCreate'
import QuizCategoryDelete from '@/components/elements/content/admin/quiz-category/QuizCategoryDelete'
import QuizCategoryTable from '@/components/elements/content/admin/quiz-category/QuizCategoryTable'
import QuizCategoryUpdate from '@/components/elements/content/admin/quiz-category/QuizCategoryUpdate'
import TitleElement from '@/components/elements/content/admin/TitleElement'
import QuizCategoryService from '@/services/QuizCategoryService'
import { handleMutation } from '@/util/mutation'
import React, { useEffect, useState } from 'react'

const QuizCategoryAdminPage = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [quizCategories, setQuizCategories] = useState<QuizCategoryResponse[]>([])
    const [quizCategory, setQuizCategory] = useState<QuizCategoryResponse>()
    useEffect(() => {
        fetchQuizCategoryList()
    }, [])
    const fetchQuizCategoryList = () => {
        handleMutation<void, QuizCategoryResponse[]>(undefined, () => QuizCategoryService.readAll(), (res) => setQuizCategories(res.data), err => console.log(err.data)
            , { success: 'Read success' })
    }
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
                <QuizCategoryCreate setQuizCategories={setQuizCategories} />
            </div>
            {quizCategory && <QuizCategoryUpdate open={openEdit} setOpen={setOpenEdit} setQuizCategories={setQuizCategories} quizCategory={quizCategory} />}
            {quizCategory && <QuizCategoryDelete open={openDelete} setOpen={setOpenDelete} setQuizCategories={setQuizCategories} quizCategory={quizCategory} />}
            <QuizCategoryTable array={quizCategories} onEdit={handleEditClick} onDelete={handleDeleteClick} />
            {/* <TableElement<QuizCategoryResponse> array={quizCategories} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} /> */}
        </>
    )
}

export default QuizCategoryAdminPage