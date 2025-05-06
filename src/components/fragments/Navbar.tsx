"use client"
import NavAuth from '@/components/common/NavAuth';
import SearchElement from '@/components/elements/header/Search';
import { Button } from '@/components/ui/button';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@radix-ui/react-navigation-menu';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const NavLinks = ({ className }: { className?: string }) => {
    return (
        <NavigationMenu>
            <NavigationMenuList className={className}>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/blog" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Blog
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/quiz" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Quiz
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/contract" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Contract
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            About
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
const Navbar = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <nav className='w-2/5 flex justify-end'>
                <div className='hidden w-full md:flex justify-between items-center'>
                    <NavLinks className='flex flex-row' />
                    <NavAuth />
                </div>
                <div className='flex md:hidden justify-end gap-x-4 grow'>
                    <NavAuth />
                    <Button variant={'secondary'} className='md:hidden' onClick={() => {
                        setShow(!show); console.log("ffff");
                    }}>{!show ? <Menu /> : <Menu className='rotate-90' />}</Button>
                </div>
            </nav>
            {show && (<nav className='md:hidden flex flex-col items-center basis-full'>
                <SearchElement />
                <NavLinks className='flex flex-col' />
            </nav>)}
        </>
    )
}

export default Navbar