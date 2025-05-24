import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Option } from "@/types/Option"

type Props = {
    options: Option[],
    onChange: (value: string) => void
    placeholder?: string,
    className?: string,
    label?: string,
    defaultValue?: string
    value?: string
}
const SelectElement = ({ options, value, defaultValue, onChange, placeholder, label, className }: Props) => {
    return (
        <Select value={value} defaultValue={defaultValue} onValueChange={onChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectElement