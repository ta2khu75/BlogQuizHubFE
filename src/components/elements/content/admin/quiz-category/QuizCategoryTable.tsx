import TableElement, { Column } from "@/components/common/TableElement"
import { Button } from "@/components/ui/button"

type Props = {
    array?: QuizCategoryResponse[]
    onEdit: (data: QuizCategoryResponse) => void
    onDelete: (data: QuizCategoryResponse) => void
}
const QuizCategoryTable = ({ array, onEdit, onDelete }: Props) => {
    const columns: Column<QuizCategoryResponse>[] = [{
        key: "no",
        label: "No",
        render: (_, index) => {
            return index + 1
        },
    }, {
        key: "name",
        label: "Name",
        name: "name",
    },
    {
        key: "action",
        label: "Action",
        className: "flex items-start",
        render: (data) => {
            return (
                <div className='flex ite'>
                    <Button onClick={() => onEdit(data)}>Edit</Button>
                    <Button onClick={() => onDelete(data)}>Delete</Button>
                </div>
            )
        }
    }]
    return (
        <TableElement<QuizCategoryResponse> array={array} columns={columns} />
    )
}

export default QuizCategoryTable;