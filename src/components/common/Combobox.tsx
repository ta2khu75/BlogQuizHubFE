import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"
import React from "react"
import { cn } from "@/lib/utils"
import useDebounce from "@/hooks/useDebounce"
import { Option } from "@/types/Option"

type Props<T extends string | number> = {
    options: Option<T>[]
    value: Option<T>
    isDebounced?: boolean
    onSelectChange: (value: Option<T>) => void
    isOptionEqual: (a: Option<T>, b: Option<T>) => boolean
    onInputChange?: (value: string) => void
    placeholder?: string
    onCreateOption?: (label: string) => Option<T>
}

export const Combobox = <T extends string | number>({
    options,
    value,
    isDebounced,
    placeholder = "Select option",
    isOptionEqual,
    onSelectChange,
    onCreateOption,
    onInputChange,
}: Props<T>) => {
    const [open, setOpen] = React.useState(false)
    const [input, setInput] = React.useState("")
    const debouncedInput = useDebounce(input)
    const searchValue = isDebounced ? debouncedInput : input
    React.useEffect(() => {
        if (onInputChange) {
            onInputChange(searchValue)
        }
    }, [searchValue, onInputChange])
    const lowerInput = input.trim().toLowerCase()
    const matched = options.find(
        (option) => option.label.toLowerCase() === lowerInput
    )
    const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(lowerInput)
    )

    const selectedLabel = options.find((i) => {
        return isOptionEqual(i, value)
    })?.label

    const handleCreate = () => {
        if (onCreateOption) {
            const newOption = onCreateOption(input.trim())
            onSelectChange(newOption)
            setOpen(false)
            setInput("")
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                        "w-[200px] justify-between",
                        !value && "text-muted-foreground"
                    )}
                >
                    {selectedLabel ?? placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search..."
                        value={input}
                        onValueChange={setInput}
                    />
                    <CommandList>
                        {handleCreate && !matched && input && (
                            <CommandItem onSelect={handleCreate} className="text-primary">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add: <span className="ml-1 font-medium">{input}</span>
                            </CommandItem>
                        )}
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                            {filtered.map((option, index) => (
                                <CommandItem
                                    key={option.value ? String(option.value) : index}
                                    value={option.label}
                                    onSelect={() => {
                                        onSelectChange(option)
                                        setOpen(false)
                                        setInput("")
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            isOptionEqual(option, value) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
