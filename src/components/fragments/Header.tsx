import Logo from "@/components/elements/header/Logo"
import SearchElement from "@/components/elements/header/Search"
import Navbar from "@/components/fragments/Navbar"
const Header = () => {
    return (
        <header className="top-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-between p-4 border-b-2">
            <div className="flex justify-between w-2/5">
                <Logo />
                <div className="hidden md:block">
                    <SearchElement />
                </div>
            </div>
            <Navbar />
        </header>
    )
}

export default Header