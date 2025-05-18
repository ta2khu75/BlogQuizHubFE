import clsx from 'clsx'
import React from 'react'
type Props = {
    children: React.ReactNode,
    className?: string
}
const TitlePage = ({ children, className }: Props) => {
    return (
        <div className={clsx("text-2xl", "font-bold", className)}>{children}</div>
    )
}

export default TitlePage