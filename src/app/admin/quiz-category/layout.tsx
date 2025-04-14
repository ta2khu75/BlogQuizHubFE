import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Manager categories",
    description: "Manager categories",
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