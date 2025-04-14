import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import FunctionUtil from "@/util/FunctionUtil";
export type Column<T> = {
    key: string, label: string, render: (data: T, index: number) => React.ReactNode | string | number
}
type Props<T> = {
    array: T[];
    columns: Column<T>[]
};
const TableElement = <T extends object>({
    array,
    columns,
}: Props<T>) => {
    return (
        <Table>
            <TableCaption>A list account</TableCaption>
            <TableHeader>
                <TableRow>
                    {columns.map(column => <TableHead key={column.key}>{FunctionUtil.capitalizeFirstLetter(column.label)}</TableHead>)}
                </TableRow>
            </TableHeader>
            <TableBody>
                {array.map((item, i) => (
                    <TableRow key={i}>
                        {columns.map((column, j) => <TableCell key={j}>{column.render(item, i)}</TableCell>)}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableElement