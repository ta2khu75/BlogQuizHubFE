import Link from "next/link"

const Logo = () => {
    return (
        <div className="md:text-4xl text-2xl hover:scale-105 transition-all">
            <Link href={"/"} >
                Blog Exam Hub
            </Link>
        </div>
    )
}

export default Logo