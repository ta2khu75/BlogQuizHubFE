import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Manager roles",
    description: "Manager roles",
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