import { RenderLeafProps } from "slate-react";

export const RenderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.superscript) {
        children = <sup>{children}</sup>;
    }
    if (leaf.subscript) {
        children = <sub>{children}</sub>;
    }

    return (
        <span
            {...attributes}
            className={`
                ${leaf.bold ? "font-bold" : ""}
                ${leaf.italic ? "italic" : ""}
                ${leaf.underline ? "underline" : ""}
                ${leaf.strikethrough ? "line-through" : ""}
                ${leaf.code ? "text-black p-1 text-sm font-mono bg-gray-200" : ""}
                ${leaf.highlight ? "text-black p-1 bg-yellow-300 border border-yellow-600" : ""}
            `}
        >
            {children}
        </span>
    );
};