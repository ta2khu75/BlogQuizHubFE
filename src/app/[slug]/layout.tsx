// app/[slug]/page.tsx (SERVER COMPONENT, không dùng "use client")

import SlugPage from "@/app/[slug]/page";

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params
    return <SlugPage slug={slug} />;
}
