import Modal from '@/components/common/Modal';
import { ImageNode } from '@/components/common/RichTextEditor/plugin/nodes/ImageNode';
import UploadImage from '@/components/common/RichTextEditor/plugin/UploadImage/UploadImage';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, NodeKey } from 'lexical';
import React, { useState } from 'react'

type Props = {
    nodeKey: NodeKey;
    src: string;
    alt?: string;
    caption?: string;
    className?: string
};
const ImageDecorate = ({ nodeKey, src, alt, caption, className }: Props) => {
    const [editor] = useLexicalComposerContext();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div>
            <figure className={`${className} relative`}>
                <button className='absolute top-0 right-0 p-2' onClick={() => setIsEditing(true)}>Edit</button>
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto rounded-md shadow"
                />
                {caption && (
                    <figcaption className="text-sm text-gray-500 mt-2 text-center italic">
                        {caption}
                    </figcaption>
                )}
            </figure>
            <Modal setOpen={setIsEditing} title='Update' open={isEditing}>
                <UploadImage value={{ src, altText: alt, caption, size: 'medium' }} onInsertImage={({ src, altText, caption, size }) => {
                    console.log(src, altText, caption, size);

                    editor.update(() => {
                        const node = $getNodeByKey(nodeKey);
                        if (node instanceof ImageNode) {
                            node.updateImage({ src, altText, caption, size });
                        }
                    });
                    setIsEditing(false);
                }} />
            </Modal>
        </div>
    )
}

export default ImageDecorate