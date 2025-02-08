import Logo from "@/components/elements/header/Logo"
import Navbar from "@/components/fragments/Navbar"
const Header = () => {
    return (
        <header className="top-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-between p-4 border-b-2">
            <Logo />
            <Navbar />
        </header>
    )
}

export default Header