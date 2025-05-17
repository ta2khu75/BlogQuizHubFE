// import { Button } from '@/components/ui/button'
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
// import { cn } from '@/lib/utils'
// import React from 'react'
// type Props = {
//     children: React.ReactNode
//     open: boolean,
//     onCancel: () => void,
//     onConfirm?: () => void
//     className?: string
//     title?: string,
//     description?: string,
// }
// const Modal = ({ children, open, onCancel, className, title, description, onConfirm }: Props) => {
//     return (
//         <Dialog open={open} onOpenChange={() => onCancel()}>
//             <DialogContent className={cn("max-w-[400px]", className)}>
//                 <DialogHeader>
//                     <DialogTitle>{title}</DialogTitle>
//                     <DialogDescription>
//                         {description}
//                     </DialogDescription>
//                 </DialogHeader>

//                 {children}
//                 {onConfirm && < DialogFooter >
//                     <Button onClick={onConfirm}>Confirm</Button>
//                     <Button onClick={onCancel}>Cancel</Button>
//                 </DialogFooter>}
//             </DialogContent>
//         </Dialog >
//     )
// }

// export default Modal; 
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
            <DialogContent
                className={cn(
                    'w-[90%] sm:w-full max-w-[90%] sm:max-w-md', // responsive sizing
                    'sm:rounded-lg p-4 sm:p-6', // padding for smaller screens
                    className
                )}
            >
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
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
