import ImageDecorate from "@/components/common/RichTextEditor/plugin/nodes/ImageDecorate";
import {
    DecoratorNode,
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    NodeKey,
    SerializedLexicalNode,
} from "lexical";
import { JSX } from "react"
export const IMAGE_SIZES = ['small', 'medium', 'large'] as const;
export type ImageSize = typeof IMAGE_SIZES[number];
const sizeDefault: ImageSize = 'medium';
const type = 'image';
interface SerializedImageNode extends SerializedLexicalNode {
    type: typeof type;
    version: 1;
    src: string;
    altText?: string;
    caption?: string;
    size: ImageSize
}
type ImageNodeAttributes = {
    src: string;
    altText?: string;
    caption?: string;
    size?: ImageSize;
}
export const $createImageNode = ({
    src,
    altText,
    caption,
    size
}: ImageNodeAttributes) => {
    return new ImageNode({ src, altText, caption, size });
};

const convertImageElement = (domNode: Node): DOMConversionOutput | null => {
    if (domNode instanceof HTMLImageElement) {
        const { src, alt } = domNode;
        const node = $createImageNode({ src, altText: alt });
        return { node };
    }
    return null;
};

const getSizeClass = (size: ImageSize): string => {
    switch (size) {
        case 'small':
            return 'w-24';
        case 'large':
            return 'w-full max-w-screen-md';
        case 'medium':
        default:
            return 'w-64';
    }
}

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText?: string;
    __caption?: string;
    __size: ImageSize;
    constructor({
        src,
        altText,
        caption,
        size,
        key,
    }: ImageNodeAttributes & { key?: NodeKey }) {
        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__caption = caption;
        this.__size = size ?? sizeDefault;
    }
    updateDOM(
        prevNode: ImageNode,
    ): boolean {
        if (
            this.__src !== prevNode.__src ||
            this.__altText !== prevNode.__altText ||
            this.__caption !== prevNode.__caption ||
            this.__size !== prevNode.__size
        ) {
            return true; // báo cho Lexical biết DOM cần được cập nhật lại
        }
        return false;
    }
    updateImage({ src, altText, caption, size }: ImageNodeAttributes) {
        const writable = this.getWritable();
        writable.__src = src;
        writable.__altText = altText;
        writable.__caption = caption;
        writable.__size = size ?? sizeDefault;
    }
    static getType(): string {
        return type;
    }

    static clone(_node: ImageNode): ImageNode {
        return new ImageNode({
            altText: _node.__altText,
            src: _node.__src,
            caption: _node.__caption,
            key: _node.__key,
        });
    }

    decorate(): JSX.Element {
        const sizeClass = getSizeClass(this.__size);
        return (
            <ImageDecorate src={this.__src} alt={this.__altText} nodeKey={this.getKey()} caption={this.__caption} className={`${sizeClass} h-auto rounded-md shadow`} />
        );
    }

    createDOM(): HTMLElement {
        const span = document.createElement("span");
        return span;
    }

    exportDOM(): DOMExportOutput {
        const figure = document.createElement("figure");
        figure.className = `${getSizeClass(this.__size)} `;
        const image = document.createElement("img");
        image.setAttribute("src", this.__src);
        if (this.__altText)
            image.setAttribute("alt", this.__altText);
        image.className = "w-full h-auto rounded-md shadow";
        figure.appendChild(image);

        if (this.__caption) {
            const figcaption = document.createElement("figcaption");
            figcaption.className = "text-sm text-gray-500 mt-2 text-center italic";
            figcaption.textContent = this.__caption;
            figure.appendChild(figcaption);
        }

        return { element: figure };
    }

    static importDOM(): DOMConversionMap | null {
        return {
            img: (node: Node) => {
                return { conversion: convertImageElement, priority: 0 };
            },
        };
    }
    static importJSON(json: SerializedImageNode): ImageNode {
        const { src, altText, size, caption, } = json;
        return new ImageNode({ src, altText, caption, size: size ?? 'medium' });
    }

    exportJSON(): SerializedImageNode {
        return {
            type: type,
            version: 1,
            src: this.__src,
            altText: this.__altText,
            size: this.__size,
        };
    }
}