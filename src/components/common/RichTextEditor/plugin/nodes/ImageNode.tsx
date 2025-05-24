import ImageComponent from "@/components/common/RichTextEditor/plugin/nodes/ImageComponent";
import {
    DecoratorNode,
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    NodeKey,
} from "lexical";
import { JSX } from "react"

export const $createImageNode = ({
    altText,
    caption,
    height,
    maxWidth = 400,
    src,
    width,
}: {
    altText: string;
    caption?: string;
    height?: number;
    maxWidth?: number;
    src: string;
    width?: number;
}) => {
    return new ImageNode({ altText, height, maxWidth, src, width });
};

const convertImageElement = (domNode: Node): DOMConversionOutput | null => {
    if (domNode instanceof HTMLImageElement) {
        const { src, alt } = domNode;
        const node = $createImageNode({ src, altText: alt });
        return { node };
    }
    return null;
};

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __caption?: string;
    __altText: string;
    __height: "inherit" | number;
    __width: "inherit" | number;
    __maxWidth: number;

    constructor({
        src,
        altText,
        caption,
        maxWidth,
        width,
        height,
        key,
    }: {
        src: string;
        altText: string;
        caption?: string;
        maxWidth: number;
        width?: "inherit" | number;
        height?: "inherit" | number;
        key?: NodeKey;
    }) {
        super(key);
        this.__altText = altText;
        this.__width = width || "inherit";
        this.__height = height || "inherit";
        this.__maxWidth = maxWidth;
        this.__src = src;
        this.__caption = caption;
    }

    static getType(): string {
        return "image";
    }

    static clone(_node: ImageNode): ImageNode {

        return new ImageNode({
            altText: _node.__altText,
            src: _node.__src,
            caption: _node.__caption,
            height: _node.__height,
            width: _node.__width,
            maxWidth: _node.__maxWidth,
            key: _node.__key,
        });
    }

    decorate(): JSX.Element {
        return (
            <ImageComponent src={this.__src} alt={this.__altText} width={this.__width} height={this.__height} nodeKey={this.__key} />
            // <img
            //     src={this.__src}
            //     alt={this.__altText}
            //     className="w-full h-auto object-cover"
            // // style={{
            // //     textAlign: "center",
            // //     width: this.__width,
            // //     height: this.__height,
            // //     maxWidth: this.__maxWidth,
            // // }}
            // />
        );
    }

    createDOM(): HTMLElement {
        const span = document.createElement("span");
        return span;
    }

    exportDOM(): DOMExportOutput {
        const image = document.createElement("img");
        image.setAttribute("src", this.__src);
        image.setAttribute("alt", this.__altText);

        return { element: image };
    }

    static importDOM(): DOMConversionMap | null {
        return {
            img: (node: Node) => {
                return { conversion: convertImageElement, priority: 0 };
            },
        };
    }
}