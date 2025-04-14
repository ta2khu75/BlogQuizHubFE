import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Manager reports",
    description: "Manager reports",
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