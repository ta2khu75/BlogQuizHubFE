"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'
type Props = {
    onIndexClick: (index: number) => void,
    states: ("selected" | "unselected" | "error" | "warning" | "correct")[]
}
const QuizMenuElement = ({ onIndexClick, states }: Props) => {
    const buttonProps: Record<
        "selected" | "unselected" | "error" | "warning" | "correct",
        { className?: string; variant?: "default" | "outline" | "destructive" }> = {
        selected: {
            className: "bg-blue-600 hover:bg-blue-500 text-white shadow-md",
            variant: "default",
        },
        unselected: {
            variant: "outline",
        },
        error: {
            variant: "destructive",
        },
        correct: {
            className: "bg-green-600 hover:bg-green-500 text-white shadow-md",
        },
        warning: {
            variant: "default",
            className: "bg-yellow-600 hover:bg-yellow-500 text-white shadow-md"
        }
    };
    return (
        <div className="grid grid-cols-4 gap-4 auto-rows-[3rem] h-[calc(4rem*3+12px*3)]">
            {states.map((status, index) => {

                const { className, variant } = buttonProps[status]

                return (
                    <Button
                        className={cn(className, "rounded-full w-12 h-12 text-center")}
                        variant={variant}
                        onClick={() => onIndexClick(index)}
                        key={`${index}`}
                    >
                        {index + 1}
                    </Button>
                );
            })}
        </div>

    )
}

export default QuizMenuElement 