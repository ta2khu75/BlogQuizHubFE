import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React from 'react'
type Props = {
    children: React.ReactNode,
    className?: string
    content: string
}
const TooltipElement = ({ children, className, content }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent className={className}>
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipElement