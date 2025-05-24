import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
type Props = {
    children: React.ReactNode,
    className?: string,
    href: string
}
const NavLink = ({ children, href, className }: Props) => {
    const pathname = usePathname()
    const isActive = pathname === href
    return (
        <Link
            className={clsx("p-4", "hover:underline", "underline-offset-4", className, { "underline": isActive })}
            href={href}>
            {children}
        </Link>
    )
}

export default NavLink