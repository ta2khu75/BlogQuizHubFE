"use client"
import TitleElement from '@/components/elements/content/admin/TitleElement'
import TableElement from '@/components/elements/content/TableElement'
import Confirm from '@/components/elements/util/Confirm'
import Modal from '@/components/elements/util/Modal'
import QuizCategoryForm from '@/components/form/QuizCategoryForm'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import QuizCategoryService from '@/services/QuizCategoryService'
import FunctionUtil from '@/util/FunctionUtil'
import React, { useEffect, useState } from 'react'

const QuizCategoryAdminPage = () => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [quizCategories, setQuizCategories] = useState<QuizCategoryResponse[]>([])
    const [quizCategory, setQuizCategory] = useState<QuizCategoryResponse>()
    useEffect(() => {
        fetchQuizCategoryList()
    }, [])
    const fetchQuizCategoryList = () => {
        QuizCategoryService.readAll().then(res => {
            if (res.success) {
                setQuizCategories(res.data)
            } else {
                console.log(res.message_error)
            }
        }).then(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    const handleEditClick = (value: QuizCategoryResponse) => {
        setQuizCategory(value)
    }
    const handleDeleteClick = (value: QuizCategoryResponse) => {
        setQuizCategory(value)
        setOpenConfirm(true)
    }
    const onSubmit = (value: QuizCategoryRequest) => {
        if (quizCategory) {
            update(quizCategory.id, value)
        } else {
            create(value)
        }
    }
    const update = async (id: number, quizCategory: QuizCategoryRequest) => {
        try {
            const res = await QuizCategoryService.update(id, quizCategory)
            if (res.success) {
                toast({ title: 'Update successful' })
                onCancel();
                setQuizCategories(quizCategories.map(quizCategory => {
                    if (quizCategory.id === res.data.id) return res.data
                    return quizCategory;
                }))
            } else {
                toast({ title: "Update failed", description: res.message_error, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Update failed", description: FunctionUtil.showError(error), variant: "destructive" })
        }
    }

    const create = async (quizCategory: QuizCategoryRequest) => {
        try {
            const res = await QuizCategoryService.create(quizCategory)
            if (res.success) {
                setQuizCategories([res.data, ...quizCategories])
                toast({ title: 'Create success' })
                onCancel();
            } else {
                toast({ title: "Create failed", description: res.message_error, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Create failed", description: FunctionUtil.showError(error), variant: "destructive" })
        }

    }
    const onContinue = () => {
        QuizCategoryService.delete(quizCategory?.id ?? 0).then(res => {
            if (res.success) {
                setQuizCategories(quizCategories.filter(item => item.id !== quizCategory?.id))
                toast({ title: "Delete successful" })
                onCancel();
            } else {
                console.log(res.message_error);
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    const onCancel = () => {
        setOpen(false)
        setOpenConfirm(false)
        setQuizCategory(undefined)
    }
    return (
        <>
            <div className="flex justify-between">
                <TitleElement>Quiz Category Manager</TitleElement>
                <Button onClick={() => setOpen(true)}>Create</Button>
            </div>
            <Modal open={open} onCancel={onCancel}>
                <QuizCategoryForm onSubmit={onSubmit} quizCategory={quizCategory} />
            </Modal>
            <Confirm title='Delete quiz category' onContinue={onContinue} open={openConfirm} onCancel={onCancel} />
            <TableElement<QuizCategoryResponse> array={quizCategories} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
        </>
    )
}

export default QuizCategoryAdminPage