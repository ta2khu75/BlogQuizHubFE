import * as React from "react"
import { format, getMonth, getYear, setMonth, setYear } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatePickerProps {
    startYear?: number;
    endYear?: number;
    isBirthday?: boolean;
    value?: Date;
    onChange: (date: Date) => void;
}
export function DatePicker({
    startYear = getYear(new Date()) - 100,
    endYear = getYear(new Date()) + 100,
    isBirthday = false,
    value, onChange
}: DatePickerProps) {

    // const [date, setDate] = React.useState<Date>(new Date());

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const handleMonthChange = (month: string) => {
        const newDate = setMonth(value ?? new Date(), months.indexOf(month));
        onChange(newDate);
    }

    const handleYearChange = (year: string) => {
        const newDate = setYear(value ?? new Date(), parseInt(year));
        onChange(newDate);
    }

    const handleSelect = (selectedData: Date | undefined) => {
        if (selectedData) {
            onChange(selectedData)
        }
    }
    const disableDate = (date: Date) => {
        if (isBirthday) return date > new Date() || date < new Date("1900-01-01")
        return false
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <div className="flex justify-between p-2">
                    <Select
                        onValueChange={handleMonthChange}
                        value={months[getMonth(value ?? new Date())]}
                    >
                        <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map(month => (
                                <SelectItem key={month} value={month}>{month}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={handleYearChange}
                        value={getYear(value ?? new Date()).toString()}
                    >
                        <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map(year => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={handleSelect}
                    initialFocus
                    month={value}
                    onMonthChange={onChange}
                    disabled={disableDate}
                />
            </PopoverContent>
        </Popover>
    )
}