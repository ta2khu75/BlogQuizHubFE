import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'
import React from 'react'
type Props = {
    isSubmitting: boolean,
    onReset?: () => void
}
const ButtonSubmit = ({ isSubmitting, onReset }: Props) => {
    return (
        <div className={clsx("flex", onReset ? "justify-between" : "justify-center")}>
            {onReset && <Button type='button' onClick={onReset} >Reset</Button>}
            {isSubmitting ?
                <Button type='button' disabled>
                    <Loader2 className="animate-spin" />
                    Please wait
                </Button>
                : <Button type='submit'>Submit</Button>
            }
        </div>
    )
}

export default ButtonSubmit