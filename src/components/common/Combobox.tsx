import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Option } from "@/types/Option"


type Props = {
    options: Option[]
    value?: string | number
    canAdd?: boolean,
    placeholder?: string
    onSelectChange: (value: string | number | undefined) => void
    onInputChange?: (value: string) => void
}

export function Combobox({ options, value, canAdd, onSelectChange, onInputChange, placeholder }: Props) {
    const [open, setOpen] = React.useState(false)
    const [input, setInput] = React.useState("")

    const lowerInput = input.trim().toLowerCase()

    const normalizedArray = options.map(opt => ({
        ...opt,
        value: opt.value.toLowerCase()
    }))

    const matchedOption = normalizedArray.find(opt => opt.value === lowerInput)

    const displayOptions = normalizedArray.filter(opt =>
        opt.label.toLowerCase().includes(lowerInput)
    )

    const handleSelect = (val: string) => {
        onSelectChange(val)
        setOpen(false)
        setInput("")
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && lowerInput) {
            e.preventDefault()
            handleSelect(lowerInput)
        }
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="w-full" asChild>
                <Button type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? options.find((option) => option.value === value)?.label ?? value
                        : `Chọn hoặc nhập ${placeholder ??
                        ""}`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent forceMount className="p-0">
                <Command>
                    <CommandInput
                        placeholder={`Nhập ${placeholder ?? ""}`}
                        value={input}
                        onKeyDown={handleKeyDown}
                        onValueChange={value => {
                            setInput(value);
                            if (onInputChange) {
                                onInputChange(value);
                            }
                        }}
                    />
                    <CommandList>
                        {canAdd && displayOptions.length === 0 && !matchedOption && lowerInput ? (
                            <CommandItem onSelect={() => handleSelect(lowerInput)}>
                                <PlusCircle className="mr-2 h-4 w-4 text-primary" />
                                Thêm tag mới: <span className="ml-1 font-medium">{lowerInput}</span>
                            </CommandItem>
                        ) : null}
                        {displayOptions.length > 0 && (
                            <CommandGroup heading="Tag gợi ý">
                                {displayOptions.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        onSelect={() => handleSelect(item.value)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === item.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {item.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                        <CommandEmpty>Không tìm thấy.</CommandEmpty>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
