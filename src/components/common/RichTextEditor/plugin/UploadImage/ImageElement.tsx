import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
type ImageElementProps = {
    imageUrl: string,
    className?: string,
    width: number
    height: number,
    onAdd?: () => void
    onDelete?: () => void
}
const ImageElement = ({ imageUrl, className, width, height, onAdd, onDelete }: ImageElementProps) => {
    return (
        <div className={`${className} relative`}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Image onClick={onAdd} width={width} height={height} className="h-full w-full rounded-md object-cover" src={imageUrl} alt="Image" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add to content</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Button onClick={onDelete} variant={'destructive'} className='rounded-full absolute top-0 w-2 h-2 p-2 right-0'>
                <X />
            </Button>

        </div>
    )
}

export default ImageElement