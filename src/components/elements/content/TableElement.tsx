"use client"
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import FunctionUtil from "@/util/FunctionUtil";
import { useEffect, useState } from "react";
type Props<T> = {
    array: T[];
    showIndex?: boolean;
    handleViewClick?: (t: T) => void;
    handleEditClick?: (t: T) => void;
    handleDeleteClick?: (t: T) => void;
    visibleColumns?: (keyof T)[];
    actions?: {
        label: string;
        onClick: (t: T) => void;
    }[]
};
const TableElement = <T extends object>({
    showIndex,
    handleDeleteClick,
    handleEditClick,
    handleViewClick,
    array,
    visibleColumns,
    actions
}: Props<T>) => {
    const [columns, setColumns] = useState<(keyof T)[]>([]);
    useEffect(() => {
        if (visibleColumns) {
            setColumns(visibleColumns);
        } else if (array.length) {
            setColumns(Object.keys(array[0]) as (keyof T)[]);
        } else {
            setColumns([]);
        }
    }, [visibleColumns, array])
    const isObject = (value: T[keyof T]) => {
        return typeof value === 'object' && value !== null;
    }
    const renderData = (data: string | T[keyof T]) => {
        if (typeof data === "string" || typeof data === "number") {
            return data;
        }
        if (isObject(data)) {
            if (FunctionUtil.isInfoResponse(data)) {
                return data.id;
            }
            else if ("name" in data) {
                return (data as { name: string }).name;
            }
        }
        return JSON.stringify(data)
    };

    return (
        <Table>
            <TableCaption>A list account</TableCaption>
            <TableHeader>
                <TableRow>
                    {showIndex && <TableHead>Index</TableHead>}
                    {columns.map((column, index) => <TableHead key={index}>{FunctionUtil.capitalizeFirstLetter(String(column))}</TableHead>)}
                    {(handleDeleteClick || handleEditClick || handleViewClick) && <TableHead>Action</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {array.map((item, i) => (
                    <TableRow key={i}>
                        {showIndex && <TableCell>{i + 1}</TableCell>}
                        {columns.map((column, j) => <TableCell key={j}>{renderData(item[column])}</TableCell>)}
                        <TableCell>
                            {handleViewClick && <Button onClick={() => handleViewClick(item)}>View</Button>}
                            {handleEditClick && <Button onClick={() => handleEditClick(item)} variant={"outline"}>Edit</Button>}
                            {handleDeleteClick && <Button onClick={() => handleDeleteClick(item)} variant={"destructive"}>Delete</Button>}
                            {actions && actions.map((action, j) => <Button key={j} onClick={() => action.onClick(item)}>{action.label}</Button>)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default TableElement