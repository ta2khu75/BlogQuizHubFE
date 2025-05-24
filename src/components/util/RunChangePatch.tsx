"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { ImageUrlsActions } from "@/redux/slice/imageUrlsSlide";

interface Props {
    readonly children: React.ReactNode
}
const RunChangePatch = ({ children }: Props) => {
    // const dispatch = useAppDispatch();
    // const pathname = usePathname();
    // useEffect(() => {
    //     console.log("running");
    //     if (pathname.startsWith("/quiz/create") || pathname.startsWith("/quiz/edit")) {
    //         localStorage.removeItem("blogForm")
    //         dispatch(ImageUrlsActions.fetchReset())
    //     } else if (pathname.startsWith("/blog/create") || pathname.startsWith("/blog/edit")) {
    //         localStorage.removeItem("quizForm")
    //     } else {
    //         dispatch(ImageUrlsActions.fetchReset())
    //         localStorage.removeItem("blogForm")
    //         localStorage.removeItem("quizForm")
    //     }
    // }, [pathname]);
    return <> {children} </>
};
export default RunChangePatch;
