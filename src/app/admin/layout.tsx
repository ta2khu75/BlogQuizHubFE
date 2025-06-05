import Aside from "@/components/fragments/Aside";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Admin",
    description: "Admin",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <SidebarProvider>
                    <Aside />
                    <main className="w-full">
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            </body>
        </html>
    );
}