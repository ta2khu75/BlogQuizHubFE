import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    children: React.ReactNode
    open: boolean
    setOpen?: (open: boolean) => void
    onCancel?: () => void
    onConfirm?: () => void
    className?: string
    title: string
    description?: string
}

const Modal = ({
    children,
    open,
    onCancel,
    setOpen,
    className,
    title,
    description,
    onConfirm,
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className={cn(
                "w-full max-w-lg mx-4 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl rounded-lg p-6 sm:p-8 bg-white",
                "overflow-auto max-h-[80vh]",
                className
            )}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
                <DialogFooter>
                    {onCancel && <Button type="button" onClick={onCancel}>Cancel</Button>}
                    {onConfirm && <Button type="button" onClick={onConfirm}>Confirm</Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default Modal