"use client"
import BlogDetailElement from '@/components/elements/content/blog/BlogDetailElement'
import QuizDetailElement from '@/components/elements/content/quiz/QuizDetailElement'
import BlogReportElement from '@/components/elements/content/report/BlogReportElement'
import QuizReportElement from '@/components/elements/content/report/QuizReportElement'
import TableElement, { Column } from '@/components/elements/content/report/ReportTable'
import Modal from '@/components/elements/util/Modal'
import ReportFilter from '@/components/filter/ReportFilter'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { BlogService } from '@/services/BlogService'
import QuizService from '@/services/QuizService'
import ReportService from '@/services/ReportService'
import { ReportStatus } from '@/types/ReportStatus'
import { TargetType } from '@/types/TargetType'
import FunctionUtil from '@/util/FunctionUtil'
import React, { useState } from 'react'

const ReportAdminPage = () => {
    const [reportPage, setReportPage] = useState<PageResponse<ReportResponse>>()
    const [target, setTarget] = useState<object>()
    const [targetType, setTargetType] = useState<TargetType>()
    const { toast } = useToast()
    const columns: Column<ReportResponse>[] = [
        {
            label: "Numerical order",
            key: "numerical_order",
            render: (_, index) => index + 1
        },
        {
            label: "Report Type",
            key: "report_type",
            render: (data) => data.report_type
        },
        {
            label: "Report status",
            key: "report_status",
            render: (data) => data.report_status
        },
        {
            label: "Target",
            key: "target",
            render: (data) => renderTarget(data)
        },
        {
            label: "Created At",
            key: "created_at",
            render: (data) => data.info.created_at
        },
        {
            label: "Updated At ",
            key: "updated_at",
            render: (data) => data.info.updated_at
        },
        {
            label: "Actions",
            key: "actions",
            render: (data) => <div className='flex flex-col gap-y-2'>
                <Button onClick={() => fetchUpdateStatus(data, ReportStatus.RESOLVED)}>Resolved</Button>
                <Button onClick={() => fetchUpdateStatus(data, ReportStatus.REJECTED)}>Rejected</Button>
                <Button onClick={() => fetchDetail(data)}>View {data.target_type === TargetType.BLOG ? "Blog" : "Quiz"}</Button>
            </div>
        }
    ]
    const fetchUpdateStatus = async (data: ReportResponse, status: ReportStatus) => {
        ReportService.updateStatus(data.info.id, status)
    }
    const fetchDetail = async (data: ReportResponse) => {
        setTargetType(data.target_type)
        if (data.target_type === TargetType.BLOG) {
            BlogService.readDetail(data.info.id.target_id).then(res => {
                if (res.success) {
                    setTarget(res.data)
                }
                else {
                    toast({ description: res.message_error, variant: "destructive" })
                }
            }).catch(err => toast({ description: FunctionUtil.showError(err), variant: "destructive" }))
        } else {
            QuizService.readDetail(data.info.id.target_id).then(res => {
                if (res.success) {
                    setTarget(res.data)
                } else {
                    toast({ description: res.message_error, variant: "destructive" })
                }
            }).catch(err =>
                toast({ description: FunctionUtil.showError(err), variant: "destructive" }))
        }
    }
    const renderTarget = (data: ReportResponse) => {
        switch (data.target_type as TargetType) {
            case TargetType.BLOG:
                return <BlogReportElement blog={data.target as BlogResponse} />
            case TargetType.QUIZ:
                return <QuizReportElement quiz={data.target as QuizResponse} />
            default:
                return <>null</>
        }
    }
    const renderView = () => {
        if (target === undefined) return null;
        switch (targetType) {
            case TargetType.BLOG:
                return <BlogDetailElement blog={target as BlogResponse} />
            case TargetType.QUIZ:
                return <QuizDetailElement quiz={target as QuizResponse} />
            default:
                return <>null</>
        }
    }
    return (
        <div className='flex'>
            <div className='w-1/3'>
                <ReportFilter setReportPage={setReportPage} />
            </div>
            <div className='w-2/3'>
                <TableElement<ReportResponse> array={reportPage?.content || []} columns={columns} />
            </div>
            <Modal open={target !== undefined} className='max-w-[800px]' onCancel={() => setTarget(undefined)} title="Report Detail" scroll={true}>
                {renderView()}
            </Modal>
        </div>
    )
}

export default ReportAdminPage