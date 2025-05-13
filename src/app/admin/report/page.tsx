"use client"
import ReportTable from '@/components/elements/content/admin/report/ReportTable'
import ReportFilter from '@/components/elements/content/admin/report/ReportFilter'
import ReportService from '@/services/ReportService'
import { ReportStatus } from '@/types/ReportStatus'
import { ReportResponse } from '@/types/response/ReportResponse'
import { handleMutation } from '@/util/mutation'
import StateHelpers from '@/util/StateHelpers'
import React, { useCallback, useState } from 'react'

const ReportAdminPage = () => {
    const [reportPage, setReportPage] = useState<PageResponse<ReportResponse>>()
    const onUpdateStatus = useCallback((data: ReportResponse, status: ReportStatus) => {
        handleMutation<ReportResponse>(() => ReportService.updateStatus(data.id, status), res => StateHelpers.updateItemByIdPage(setReportPage, res.data), undefined, { success: 'Update success', error: 'Update failed' })
    }, [])
    return (
        <div className='flex'>
            <div className='w-1/3'>
                <ReportFilter setReportPage={setReportPage} />
            </div>
            <div className='w-2/3'>
                <ReportTable array={reportPage?.content} onUpdateStatus={onUpdateStatus} />
            </div>
        </div>
    )
}

export default ReportAdminPage