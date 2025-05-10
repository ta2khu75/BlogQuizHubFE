import TableElement, { Column } from "@/components/common/TableElement"
import { Button } from "@/components/ui/button"

type Props = {
    array?: ReportResponse[]
    onEdit: (data: ReportResponse) => void
    onDelete: (data: ReportResponse) => void
}
const QuizCategoryTable = ({ array, onEdit, onDelete }: Props) => {
    const columns: Column<ReportResponse>[] = [
        {
            label: "No",
            key: "No",
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

    const columns: Column<ReportResponse>[] = [{
        key: "no",
        label: "No",
        render: (_, index) => {
            return index + 1
        },
    }, {
        key: "name",
        label: "Name",
        name: "report_type"
    },
    {
        key: "action",
        label: "Action",
        className: "flex items-start",
        render: (data) => {
            return (
                <div className='flex'>
                    <Button onClick={() => onEdit(data)}>Edit</Button>
                    <Button onClick={() => onDelete(data)}>Delete</Button>
                </div>
            )
        }
    }]
    return (
        <TableElement<ReportResponse> array={array} columns={columns} />
    )
}

export default QuizCategoryTable;