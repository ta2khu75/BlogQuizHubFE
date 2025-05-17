import { Button } from '@/components/ui/button'
import React from 'react'
type Props = {
    onClick?: () => void,
    children: React.ReactNode,
    type?: "button" | "submit" | "reset" | undefined
    variant?: "default" | "selected" | "correct" | "warning" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}
const ButtonMemo = ({ children, onClick, variant, type = "button" }: Props) => {
    return (
        <Button variant={variant} type={type} onClick={onClick} >{children}</Button>
    )
}

export default React.memo(ButtonMemo)