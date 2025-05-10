import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
export type Column<T> = {
    key: string;
    label: string;
    name: keyof T;
    className?: string;
    render?: (data: T, index: number) => React.ReactNode | string | number
}
    | {
        key: string;
        label: string;
        className?: string;
        render: (data: T, index: number) => React.ReactNode | string | number
        name?: keyof T;
    };
type Props<T> = {
    array?: T[];
    columns: Column<T>[]
    caption?: string
};
const TableElement = <T extends object>({
    array,
    columns,
    caption
}: Props<T>) => {
    function getCellValue<T>(column: Column<T>, row: T, index: number) {
        if (column.render) return column.render(row, index);
        else if (column.name) return row[column.name] as React.ReactNode;
        return null;
    }
    return (
        <Table>
            <TableCaption>{caption}</TableCaption>
            <TableHeader>
                <TableRow>
                    {columns.map(column => <TableHead key={column.key}>{column.label}</TableHead>)}
                </TableRow>
            </TableHeader>
            <TableBody>
                {array?.map((item, i) => (
                    <TableRow key={i}>
                        {columns.map((column, j) => <TableCell className={column.className} key={j}>{getCellValue(column, item, i)}</TableCell>)}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableElement