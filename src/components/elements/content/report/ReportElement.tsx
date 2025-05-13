import Modal from '@/components/common/Modal'
import { Button } from '@/components/ui/button'
import { FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import ReportService from '@/services/ReportService'
import { ReportType } from '@/types/ReportType'
import { ReportResponse } from '@/types/response/ReportResponse'
import { TargetType } from '@/types/TargetType'
import { handleMutation } from '@/util/mutation'
import React, { useState } from 'react'
type Props = {
    targetId: string
    targetType: TargetType
    setReport: (value: ReportResponse) => void
}
const ReportElement = ({ targetId, targetType, setReport }: Props) => {
    const [open, setOpen] = useState(false)
    const [isError, setIsError] = useState(false)
    const [reportType, setReportType] = useState<ReportType>()
    const onConfirm = () => {
        if (!reportType) {
            setIsError(true)
        } else {
            setIsError(false)
            fetchCreateReport({ target_id: targetId, type: reportType, target_type: targetType })
        }
    }
    const fetchCreateReport = async (value: ReportRequest) => {
        handleMutation<ReportResponse>(() => ReportService.create(value), (res) => {
            setOpen(false)
            setReport(res.data)
        }, undefined, { success: 'Report success', error: 'Report failed' })
    }
    return (
        <>
            <Button onClick={() => setOpen(true)}>Report</Button>
            <Modal open={open} title='Report' onConfirm={() => onConfirm()} onCancel={() => setOpen(false)}>
                <Select onValueChange={(value) => { setReportType(value as ReportType) }}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {isError && <FormMessage>Please select report type</FormMessage>}
                            <SelectLabel>Report Type</SelectLabel>
                            {Object.keys(ReportType).map((key) => (
                                <SelectItem key={key} value={ReportType[key as keyof typeof ReportType]}>
                                    {ReportType[key as keyof typeof ReportType]}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Modal>
        </>
    )
}

export default ReportElement