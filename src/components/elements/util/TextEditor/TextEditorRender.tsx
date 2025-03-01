import { RenderElementProps } from "slate-react";

export const RenderElement = ({
    attributes,
    children,
    element,
}: RenderElementProps) => {
    const style = { textAlign: element.align };
    switch (element.type) {
        case "block-quote": {
            return (
                <blockquote
                    style={style}
                    className="pl-3 border-l-4 text-gray-600 dark:text-gray-400 border-gray-300 bg-gray-100 dark:border-gray-500 dark:bg-gray-800"
                    {...attributes}
                >
                    {children}
                </blockquote>
            );
        }
        case "numbered-list": {
            return (
                <ol style={style} className="list-decimal"  {...attributes}>
                    {children}
                </ol>
            );
        }
        case "bulleted-list": {
            return (
                <ul style={style} className="list-disc" {...attributes}>
                    {children}
                </ul>
            );
        }
        case "list-item": {
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            );
        }
        case "h1": {
            return (
                <h1 style={style} className="text-6xl" {...attributes}>
                    {children}
                </h1>
            );
        }
        case "h2": {
            return (
                <h2 style={style} className="text-5xl" {...attributes}>
                    {children}
                </h2>
            );
        }
        case "h3": {
            return (
                <h3 style={style} className="text-4xl" {...attributes}>
                    {children}
                </h3>
            );
        }
        case "h4": {
            return (
                <h4 style={style} className="text-3xl" {...attributes}>
                    {children}
                </h4>
            );
        }
        case "h5": {
            return (
                <h5 style={style} className="text-2xl" {...attributes}>
                    {children}
                </h5>
            );
        }
        case "h6": {
            return (
                <h6 style={style} className="text-xl" {...attributes}>
                    {children}
                </h6>
            );
        }
        case "link":
            return (
                <a className="text-blue-600 dark:text-blue-500 hover:underline" target="_blank" href={element.url} {...attributes}>
                    {children}
                </a>
            )
        case "image": {
            return (
                <img src={element.url} alt="" {...attributes} />
            )
        }
        default: {
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            );
        }
    }
};