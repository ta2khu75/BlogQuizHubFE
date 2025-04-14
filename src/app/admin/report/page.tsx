"use client"
import BlogReportElement from '@/components/elements/content/report/BlogReportElement'
import QuizReportElement from '@/components/elements/content/report/QuizReportElement'
import TableElement, { Column } from '@/components/elements/content/report/ReportTable'
import ReportFilter from '@/components/filter/ReportFilter'
import { Button } from '@/components/ui/button'
import { TargetType } from '@/types/TargetType'
import React, { useState } from 'react'

const ReportAdminPage = () => {
    const [reportPage, setReportPage] = useState<PageResponse<ReportResponse>>()
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
            render: (data) => <div className='flex flex-col gap-y-2'><Button onClick={() => fetchUpdate(data)}>Details</Button>
            </div>
        }
    ]
    const fetchUpdate = async (data: ReportResponse) => {
        console.log(data);
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
    return (
        <div className='flex'>
            <div className='w-1/3'>
                <ReportFilter setReportPage={setReportPage} />
            </div>
            <div className='w-2/3'>
                <TableElement<ReportResponse> array={reportPage?.content || []} columns={columns} />
            </div>
        </div>
    )
}

export default ReportAdminPage