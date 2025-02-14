"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
type Props = {
    onIndexClick: (index: number) => void,
    states: ("selected" | "unselected" | "disabled" | "error")[]
}
const ExamMenuElement = ({ onIndexClick, states }: Props) => {
    return (
        <div className='grid grid-cols-4 gap-4'>
            {states.map((status, index) => {
                if (status === "selected") {
                    return <Button className='bg-blue-600 hover:bg-blue-500' onClick={() => onIndexClick(index)} key={index} >{index + 1}</Button>
                } else if (status === "unselected") {
                    return <Button onClick={() => onIndexClick(index)} key={index} >{index + 1}</Button>
                } else {
                    return <Button onClick={() => onIndexClick(index)} key={index} variant={"destructive"} >{index + 1}</Button>
                }
            })
            }
        </div>
    )
}

export default ExamMenuElement 