import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Register",
    description: "Register",
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