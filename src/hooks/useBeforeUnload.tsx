"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useRemoveStorage = () => {
    const pathname = usePathname();
    useEffect(() => {
        if (pathname.startsWith("/exam/create") || pathname.startsWith("/exam/edit")) {
            localStorage.removeItem("blogForm")
        } else if (pathname.startsWith("/blog/create") || pathname.startsWith("/blog/edit")) {
            localStorage.removeItem("examForm")
        } else {
            localStorage.removeItem("blogForm")
            localStorage.removeItem("examForm")
        }
    }, [pathname]);
};

export default useRemoveStorage;
