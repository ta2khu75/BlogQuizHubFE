import TableElement, { Column } from '@/components/common/TableElement'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
type Props = {
    array?: RoleResponse[]
    onEdit: (data: RoleResponse) => void
    onDelete: (data: RoleResponse) => void
}
const RoleTable = ({ array, onEdit, onDelete }: Props) => {

    const columns: Column<RoleResponse>[] = [{
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
        className: clsx("flex items-start"),
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
        <TableElement<RoleResponse> array={array} columns={columns} />
    )
}

export default RoleTable;