"use client"
import TitleElement from '@/components/elements/content/admin/TitleElement'
import TableElement from '@/components/elements/content/TableElement'
import Confirm from '@/components/elements/util/Confirm'
import Modal from '@/components/elements/util/Modal'
import ExamCategoryForm from '@/components/form/ExamCategoryForm'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import ExamCategoryService from '@/services/ExamCategoryService'
import FunctionUtil from '@/util/FunctionUtil'
import React, { useEffect, useState } from 'react'

const ExamCategoryAdminPage = () => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [examCategories, setExamCategories] = useState<ExamCategoryResponse[]>([])
    const [examCategory, setExamCategory] = useState<ExamCategoryResponse>()
    useEffect(() => {
        fetchExamCategoryList()
    }, [])
    const fetchExamCategoryList = () => {
        ExamCategoryService.readAll().then(res => {
            if (res.success) {
                setExamCategories(res.data)
            } else {
                console.log(res.message_error)
            }
        }).then(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    const handleEditClick = (value: ExamCategoryResponse) => {
        setExamCategory(value)
    }
    const handleDeleteClick = (value: ExamCategoryResponse) => {
        setExamCategory(value)
        setOpenConfirm(true)
    }
    const onSubmit = (value: ExamCategoryRequest) => {
        if (examCategory) {
            update(examCategory.id, value)
        } else {
            create(value)
        }
    }
    const update = async (id: number, examCategory: ExamCategoryRequest) => {
        try {
            const res = await ExamCategoryService.update(id, examCategory)
            if (res.success) {
                toast({ title: 'Update successful' })
                onCancel();
                setExamCategories(examCategories.map(examCategory => {
                    if (examCategory.id === res.data.id) return res.data
                    return examCategory;
                }))
            } else {
                toast({ title: "Update failed", description: res.message_error, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Update failed", description: FunctionUtil.showError(error), variant: "destructive" })
        }
    }

    const create = async (examCategory: ExamCategoryRequest) => {
        try {
            const res = await ExamCategoryService.create(examCategory)
            if (res.success) {
                setExamCategories([res.data, ...examCategories])
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
        ExamCategoryService.delete(examCategory?.id ?? 0).then(res => {
            if (res.success) {
                setExamCategories(examCategories.filter(item => item.id !== examCategory?.id))
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
        setExamCategory(undefined)
    }
    return (
        <>
            <div className="flex justify-between">
                <TitleElement>Exam Category Manager</TitleElement>
                <Button onClick={() => setOpen(true)}>Create</Button>
            </div>
            <Modal open={open} onCancel={onCancel}>
                <ExamCategoryForm onSubmit={onSubmit} examCategory={examCategory} />
            </Modal>
            <Confirm title='Delete exam category' onContinue={onContinue} open={openConfirm} onCancel={onCancel} />
            <TableElement<ExamCategoryResponse> array={examCategories} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
        </>
    )
}

export default ExamCategoryAdminPage