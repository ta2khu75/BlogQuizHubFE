"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useRemoveStorage = () => {
    const pathname = usePathname();
    useEffect(() => {
        if (pathname.startsWith("/quiz/create") || pathname.startsWith("/exam/edit")) {
            localStorage.removeItem("blogForm")
        } else if (pathname.startsWith("/blog/create") || pathname.startsWith("/blog/edit")) {
            localStorage.removeItem("quizForm")
        } else {
            localStorage.removeItem("blogForm")
            localStorage.removeItem("quizForm")
        }
    }, [pathname]);
};

export default useRemoveStorage;
