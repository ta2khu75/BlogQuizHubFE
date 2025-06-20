"use client"
import SlugUtil from "@/util/SlugUtil";
import QuizAboutPage from "@/app/quiz/about/[slug]/page";
import BlogDetailPage from "@/app/blog/[slug]/page";

const SlugPage = ({ slug }: { slug: string }) => {
    const prefix = SlugUtil.readPrefixFromSlug(slug)
    const id = SlugUtil.readIdFromSlug(slug)

    switch (prefix) {
        case "q":
            return <QuizAboutPage id={id} />;
        case "b":
            return <BlogDetailPage id={id} />;
        case "c":
            return null;

        default:
            return null;
    }
}

export default SlugPage;