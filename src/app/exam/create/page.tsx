"use client"
import ExamForm from '@/components/form/ExamForm'
import { useToast } from '@/hooks/use-toast'
import ExamCategoryService from '@/services/ExamCategoryService'
import FunctionUtil from '@/util/FunctionUtil'
import React, { useEffect, useState } from 'react'

const ExamCreatePage = () => {
    const { toast } = useToast()
    const [examCategories, setExamCategories] = useState<ExamCategoryResponse[]>([]);
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
        }).catch(err =>
            toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    return (
        <ExamForm examCategories={examCategories} />
    )
}

export default ExamCreatePage