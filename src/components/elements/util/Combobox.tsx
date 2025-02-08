"use client"
import { Button } from '@/components/ui/button'
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { FormControl } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, Command } from 'lucide-react'
type DataItem = {
    value: string | number,
    label: string
}
type Props = {
    array: DataItem[],
    value: string | number,
    onChange: (value: string | number) => void
}
const Combobox = ({ array, value, onChange }: Props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "w-[200px] justify-between",
                            !value && "text-muted-foreground"
                        )}
                    >
                        {value
                            ? array.find(
                                (item) => item.value === value
                            )?.label
                            : "Select role"}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {array.map((item) => (
                                <CommandItem
                                    value={item.label}
                                    key={item.value}
                                    onSelect={() => {
                                        onChange(item.value)
                                    }}
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            item.value === value
                                                ? "opacity-100"
                                                : "opacity-0"
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

export default Combobox