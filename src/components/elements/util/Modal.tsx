import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import React from 'react'
type Props = {
    children: React.ReactNode
    open: boolean,
    onCancel: () => void,
    onConfirm?: () => void
    className?: string
    title?: string,
    description?: string,
    scroll?: boolean
}
const Modal = ({ children, open, onCancel, className, title, description, scroll, onConfirm }: Props) => {
    return (
        <Dialog open={open} onOpenChange={() => onCancel()}>
            <DialogContent className={cn("max-w-[400px]", className)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {scroll &&
                    <ScrollArea className="h-[300px] md:h-[400px] lg:h-[500px] rounded-md border">
                        {children}
                    </ScrollArea>}
                {!scroll && <>{children}</>}
            </DialogContent>
            {onConfirm && <DialogFooter>
                <Button onClick={onConfirm}>Confirm</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </DialogFooter>
            }
        </Dialog>
    )
}

export default Modal; 