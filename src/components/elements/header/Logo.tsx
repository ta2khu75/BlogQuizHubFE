import Link from "next/link"

const Logo = () => {
    return (
        <div className="md:text-xl flex items-center lg:text-3xl text-1xl lg:font-semibold md:font-medium font-normal hover:scale-105 transition-all">
            <Link href={"/"} >
                Blog Exam Hub
            </Link>
        </div>
    )
}

export default Logo