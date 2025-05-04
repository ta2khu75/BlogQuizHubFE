import Link from 'next/link'
import React from 'react'
type Props = {
    children: React.ReactNode
}
const TitleHeader = ({ children }: Props) => {
    return (
        <Link href={'/'}>
            <h1 className='text-3xl font-bold'>{children}</h1>
        </Link>
    )
}

export default TitleHeader