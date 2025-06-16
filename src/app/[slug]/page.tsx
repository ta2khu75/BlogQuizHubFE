"use client"
import SlugUtil from "@/util/SlugUtil";
import QuizAboutPage from "@/app/quiz/about/[slug]/page";

const SlugPage = ({ slug }: { slug: string }) => {
    const prefix = SlugUtil.readPrefixFromSlug(slug)
    const id = SlugUtil.readIdFromSlug(slug)

    switch (prefix) {
        case "q":
            return <QuizAboutPage id={id} />;
        case "b":
            return null;
        case "c":
            return null;

        default:
            return null;
    }
}

export default SlugPage;