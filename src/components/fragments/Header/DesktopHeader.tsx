import NavLink from '@/components/common/NavLink'
import NavAuth from '@/components/common/NavAuth'
import TitleHeader from '@/components/elements/header/TitleHeader'
import useIsAuth from '@/hooks/useIsAuth'

const DesktopHeader = () => {
    const isAuth = useIsAuth()
    return (
        <header>
            <div className='flex justify-between items-center w-full h-16 px-4'>
                <div className='flex items-center'>
                    <TitleHeader>Blog Quiz Hub</TitleHeader>
                </div>
                <nav className='flex items-center'>
                    <NavLink href={'/'}>Home</NavLink>
                    <NavLink href={'/contract'}>Contact</NavLink>
                    <NavLink href={'/about'}>About</NavLink>
                    {isAuth ?
                        <NavAuth />
                        : <>
                            <NavLink href={'/login'}>Login</NavLink>
                            <NavLink href={'/register'}>Register</NavLink>
                        </>
                    }
                    {/* <NavLink href={'/blog'}>Blog</NavLink>  */}
                </nav>
            </div>
        </header>
    )

}

export default DesktopHeader
