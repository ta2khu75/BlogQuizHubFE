import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import React from 'react'

type Props = {
    children: React.ReactNode
    open: boolean
    onCancel: () => void
    onConfirm?: () => void
    className?: string
    title?: string
    description?: string
}

const Modal = ({
    children,
    open,
    onCancel,
    className,
    title,
    description,
    onConfirm,
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent className={className}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="mt-4">{children}</div>
                {onConfirm && (
                    <DialogFooter>
                        <Button onClick={onConfirm}>Confirm</Button>
                        <Button variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default Modal
