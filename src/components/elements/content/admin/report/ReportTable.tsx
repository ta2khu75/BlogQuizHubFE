import TableElement, { Column } from "@/components/common/TableElement"
import BlogReportRender from "@/components/elements/content/admin/report/BlogReportRender"
import QuizReportRender from "@/components/elements/content/admin/report/QuizReportRender"
import { Button } from "@/components/ui/button"
import { ReportStatus } from "@/types/ReportStatus"
import { BlogResponse } from "@/types/response/BlogResponse"
import { QuizResponse } from "@/types/response/QuizResponse"
import { ReportResponse } from "@/types/response/ReportResponse"
import { TargetType } from "@/types/TargetType"
import { usePathname } from "next/navigation"
import { useCallback } from "react"

type Props = {
    array?: ReportResponse[],
    onUpdateStatus: (data: ReportResponse, status: ReportStatus) => void
}
const ReportTable = ({ array, onUpdateStatus }: Props) => {
    const pathname = usePathname()
    const makeUrl = useCallback((profileId: number) => {
        return `${pathname}?author_id=${profileId}`
    }, [])
    const renderTarget = useCallback((data: ReportResponse) => {
        switch (data.id.target_type as TargetType) {
            case TargetType.BLOG:
                return <BlogReportRender makeUrl={makeUrl} blog={data.target as BlogResponse} />
            case TargetType.QUIZ:
                return <QuizReportRender makeUrl={makeUrl} quiz={data.target as QuizResponse} />
            default:
                return <>null</>
        }
    }, [])

    const columns: Column<ReportResponse>[] = [
        {
            label: "No",
            key: "No",
            render: (_, index) => index + 1
        },
        {
            label: "Report Type",
            key: "report_type",
            render: (data) => data.type
        },
        {
            label: "Report status",
            key: "report_status",
            render: (data) => data.status
        },
        {
            label: "Target",
            key: "target",
            render: (data) => renderTarget(data)
        },
        {
            label: "Created At",
            key: "created_at",
            render: (data) => data.created_at
        },
        {
            label: "Updated At ",
            key: "updated_at",
            render: (data) => data.updated_at
        },
        {
            label: "Actions",
            key: "actions",
            render: (data) => <div className='flex flex-col gap-y-2'>
                <Button onClick={() => onUpdateStatus(data, ReportStatus.RESOLVED)}>Resolved</Button>
                <Button onClick={() => onUpdateStatus(data, ReportStatus.REJECTED)}>Rejected</Button>
            </div>
        }
    ]

    return (
        <TableElement<ReportResponse> array={array} columns={columns} />
    )
}

export default ReportTable;