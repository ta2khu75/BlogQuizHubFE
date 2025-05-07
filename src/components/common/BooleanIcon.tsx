import clsx from "clsx";
import { Check, X } from "lucide-react";

type Props = {
    value: boolean
    trueColor?: string;
    falseColor?: string;
    className?: string
    onClick?: (value: boolean) => void
}
const BooleanIcon = ({ value, trueColor, falseColor, className, onClick }: Props) => {
    const Icon = value ? Check : X;
    const classNamee = clsx(className, value ? trueColor : falseColor);

    return <Icon onClick={() => onClick?.(!value)} className={classNamee} />;
}

export default BooleanIcon