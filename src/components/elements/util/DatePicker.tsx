"use client"
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from "date-fns"
import { useState } from 'react'
interface Props {
    value?: Date;
    onChange: (date: Date | undefined) => void;
}
const DatePicker = ({ value, onChange }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={`w-full pl-3 text-left font-normal ${!value ? "text-muted-foreground" : ""}`}
                >
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    fromYear={1900} // 👈 Cho phép chọn năm từ 1900
                    toYear={new Date().getFullYear()}
                    selected={value}
                    onSelect={(date) => {
                        onChange(date);
                        setOpen(false); // Đóng popover sau khi chọn ngày
                    }}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                />
            </PopoverContent>
        </Popover>);
}

export default DatePicker