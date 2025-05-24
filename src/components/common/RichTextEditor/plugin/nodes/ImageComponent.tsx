import { ImageNode } from "@/components/common/RichTextEditor/plugin/nodes/ImageNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey, NodeKey } from "lexical";
import { useState } from "react";

type ImageComponentProps = {
    nodeKey: NodeKey;
    src: string;
    alt: string;
    caption?: string;
    maxWidth?: string;
    width: "inherit" | number;
    height: "inherit" | number;
};

const ImageComponent: React.FC<ImageComponentProps> = ({ nodeKey, src, alt, caption, maxWidth, width, height }) => {
    const [editor] = useLexicalComposerContext();
    const [isEditing, setIsEditing] = useState(false);
    const [newSrc, setNewSrc] = useState(src);
    const [newAlt, setNewAlt] = useState(alt);

    const onSave = () => {
        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if (node instanceof ImageNode) {
                // Cập nhật các thuộc tính ảnh
                node.__src = newSrc;
                node.__altText = newAlt;
            }
        });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div>
                <input
                    type="text"
                    value={newSrc}
                    onChange={(e) => setNewSrc(e.target.value)}
                    placeholder="Image URL"
                    style={{ width: "100%" }}
                />
                <input
                    type="text"
                    value={newAlt}
                    onChange={(e) => setNewAlt(e.target.value)}
                    placeholder="Alt text"
                    style={{ width: "100%" }}
                />
                <button onClick={onSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth, width, height, position: "relative", display: "inline-block" }}>
            <img src={src} alt={alt} style={{ maxWidth: "100%", width, height }} />
            {caption && <figcaption>{caption}</figcaption>}
            <div style={{ position: "absolute", top: 0, right: 0, background: "rgba(255,255,255,0.7)" }}>
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
        </div>
    );
};

export default ImageComponent;