import NavLink from "@/components/common/NavLink"
import NavAuth from "@/components/common/NavAuth"
import TitleHeader from "@/components/elements/header/TitleHeader"
import { Button } from "@/components/ui/button"
import useIsAuth from "@/hooks/useIsAuth"
import clsx from "clsx"
import { Menu } from "lucide-react"
import { useState } from "react"

const MobileHeader = () => {
    const [isOpen, setIsOpen] = useState(false)
    const isAuth = useIsAuth()
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <header>
            <div className="flex justify-between items-center w-full h-16 px-4">
                <div className="flex items-center">
                    <TitleHeader>Blog Quiz Hub</TitleHeader>
                </div>
                <div className="flex items-center">
                    {isAuth && <NavAuth />}
                    <Button onClick={toggleMenu} variant={isOpen ? "default" : "ghost"} type="button" className="" id="mobile-menu-button">
                        <Menu />
                    </Button>
                </div>
            </div>
            <nav className={clsx("flex flex-col items-center  md:flex md:items-center", "absolute top-16 left-0 w-full bg-white z-50", { "hidden": !isOpen })} id="mobile-nav">
                <NavLink href={"/"}>Home</NavLink>
                <NavLink href={"/contract"}>Contact</NavLink>
                <NavLink href={"/about"}>About</NavLink>
                {
                    !isAuth &&
                    <>
                        <NavLink href={"/login"}>Login</NavLink>
                        <NavLink href={"/register"}>Register</NavLink>
                    </>
                }
            </nav>
        </header>
        // <header>
        //     <div className="flex justify-between items-center w-full h-16 px-4">
        //         <div className="flex items-center">
        //             <h1 className="text-3xl font-bold">Blog Quiz Hub</h1>
        //         </div>
        //         <div className="flex items-center">
        //             <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300">Menu</button>
        //         </div>
        //         <nav className="flex items-center">
        //             <NavLink href={"/"}>Home</NavLink>
        //             <NavLink href={"/contract"}>Contact</NavLink>
        //             <NavLink href={"/about"}>About</NavLink>
        //             <NavLink href={"/login"}>Login</NavLink>
        //             <NavLink href={"/register"}>Register</NavLink>
        //         </nav>
        //     </div>
        // </header>
    )
}

export default MobileHeader