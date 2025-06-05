import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Option } from "@/types/Option"

type Props<T extends string | number> = {
    options: Option<T>[];
    onChange: (value: T) => void;
    placeholder?: string;
    className?: string;
    label?: string;
    defaultValue?: T;
    value?: T;
};

const Selection = <T extends string | number>({
    options,
    value,
    defaultValue,
    onChange,
    placeholder,
    label,
    className,
}: Props<T>) => {
    return (
        <Select
            value={value?.toString()}
            defaultValue={defaultValue?.toString()}
            onValueChange={(val) => {
                const original = options.find(opt => opt.value.toString() === val)?.value;
                if (original !== undefined) {
                    onChange(original);
                }
            }}
        >
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {label && <SelectLabel>{label}</SelectLabel>}
                    {options.map(option => (
                        <SelectItem key={option.value.toString()} value={option.value.toString()}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default Selection;