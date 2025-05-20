import { Button } from '@/components/ui/button'
import { HexColorPicker } from "react-colorful";
import React, { useEffect, useRef, useState } from 'react'
type Props = {
    icon: React.ReactNode,
    color: string,
    style: React.CSSProperties
    onChange: (color: string) => void
}
const ColorPicker = ({ icon, color, style, onChange }: Props) => {
    const [open, setOpen] = useState(false)
    const lastColor = useRef(color);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
    const handleChange = (newColor: string) => {
        lastColor.current = newColor;
    };

    const handleMouseUp = () => {
        onChange(lastColor.current);
    };
    return (
        <div className='relative'>
            <Button type='button' variant={'outline'} style={style} onClick={() => setOpen(!open)}>{icon}</Button>
            {open &&
                <div ref={popoverRef} role="dialog" onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp} className='absolute top-8 left-8 z-10'>
                    <HexColorPicker className='p-4 bg-white rounded-sm border border-black' color={color} onChange={handleChange} />
                </div>}
        </div>
    )
}

export default ColorPicker