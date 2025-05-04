"use client"
import { useIsMobile } from "@/hooks/use-mobile"
import dynamic from "next/dynamic"
const MobileHeader = dynamic(() => import('./MobileHeader'), { ssr: false });
const DesktopHeader = dynamic(() => import('./DesktopHeader'), { ssr: false });
const Header = () => {
    const isMobile = useIsMobile()
    if (isMobile === null) return null
    return isMobile ? <MobileHeader /> : <DesktopHeader />
}

export default Header