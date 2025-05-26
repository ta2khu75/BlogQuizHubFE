import Modal from '@/components/common/Modal'
import { $createImageNode, ImageSize } from '@/components/common/RichTextEditor/plugin/nodes/ImageNode'
import UploadImage from '@/components/common/RichTextEditor/plugin/UploadImage/UploadImage'
import { Button } from '@/components/ui/button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $insertNodes } from 'lexical'
import { Image } from 'lucide-react'
import React, { useState } from 'react'

const ImagePlugin = () => {
    const [editor] = useLexicalComposerContext()
    const [open, setOpen] = useState(false)
    const onInsertImage = ({ src, altText, caption, size }: { src: string, altText?: string, caption?: string, size?: ImageSize }) => {
        editor.update(() => {
            const node = $createImageNode({ src, altText, caption, size })
            $insertNodes([node])
            setOpen(false)
        })
    }
    return (
        <>
            <Button variant={"outline"} onClick={() => setOpen(true)}><Image /></Button>
            <Modal open={open} setOpen={setOpen} title="Insert Image">
                <UploadImage onInsertImage={onInsertImage} />
            </Modal>
        </>

    )
}

export default ImagePlugin