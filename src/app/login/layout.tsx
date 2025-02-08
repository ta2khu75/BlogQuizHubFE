import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Log in",
    description: "Log in",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}