"use client"
import ExamForm from '@/components/form/ExamForm'
import { useToast } from '@/hooks/use-toast'
import ExamCategoryService from '@/services/ExamCategoryService'
import ExamService from '@/services/ExamService'
import FunctionUtil from '@/util/FunctionUtil'
import { use, useEffect, useState } from 'react'

const ExamEditPage = ({ params }: { params: Promise<{ examId: string }> }) => {
    const { toast } = useToast()
    const { examId } = use(params)
    const [examCategories, setExamCategories] = useState<ExamCategoryResponse[]>([]);
    const [exam, setExam] = useState<ExamResponse>();
    useEffect(() => {
        fetchExamCategoryList()
        fetchExam()
    }, [examId])
    const fetchExam = () => {
        ExamService.readDetailById(examId).then(res => {
            if (res.success) {
                setExam(res.data)
            } else {
                console.log(res.message_error)
            }
        }).catch(err =>
            toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
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
        <ExamForm examCategories={examCategories} exam={exam} />
    )
}

export default ExamEditPage