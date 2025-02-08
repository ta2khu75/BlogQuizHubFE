import React from 'react'
type Props = {
    children: React.ReactNode
}
const TitleElement = ({ children }: Props) => {
    return (
        <div className='text-2xl'>{children}</div>
    )
}

export default TitleElement