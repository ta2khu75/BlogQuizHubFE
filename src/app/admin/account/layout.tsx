import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Manager accounts",
    description: "Manager accounts",
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