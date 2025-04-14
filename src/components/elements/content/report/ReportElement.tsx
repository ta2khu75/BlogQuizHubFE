import Modal from '@/components/elements/util/Modal'
import { Button } from '@/components/ui/button'
import { FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import ReportService from '@/services/ReportService'
import { ReportType } from '@/types/ReportType'
import { TargetType } from '@/types/TargetType'
import FunctionUtil from '@/util/FunctionUtil'
import React, { useState } from 'react'
type Props = {
    targetId: string
    targetType: TargetType
}
const ReportElement = ({ targetId, targetType }: Props) => {
    const { toast } = useToast()
    const [openReport, setOpenReport] = useState(false)
    const [isError, setIsError] = useState(false)
    const [reportType, setReportType] = useState<ReportType>()
    const onConfirm = () => {
        if (!reportType) {
            setIsError(true)
        } else {
            setIsError(false)
            fetchCreateReport({ target_id: targetId, report_type: reportType, target_type: targetType })
        }
    }
    const fetchCreateReport = async (value: ReportRequest) => {
        ReportService.create(value).then(res => {
            if (res.success) {
                toast({ title: "Report success" })
            } else {
                toast({ title: "Report failed", description: res.message_error, variant: "destructive" })
            }
        }
        ).catch(err => toast({ title: "Report failed", description: FunctionUtil.showError(err), variant: "destructive" }))
    }
    return (
        <>
            <div>
                <Button onClick={() => setOpenReport(true)}>Report</Button>
            </div>
            <Modal open={openReport} onConfirm={() => onConfirm()} onCancel={() => setOpenReport(false)}>

                <h1>Report</h1>
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