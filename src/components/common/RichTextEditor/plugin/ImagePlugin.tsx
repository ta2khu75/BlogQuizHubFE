import Modal from '@/components/common/Modal'
import { $createImageNode } from '@/components/common/RichTextEditor/plugin/nodes/ImageNode'
import UploadImage from '@/components/common/RichTextEditor/plugin/UploadImage/UploadImage'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/redux/hooks'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $insertNodes } from 'lexical'
import { Image } from 'lucide-react'
import React, { useState } from 'react'

const ImagePlugin = () => {
    const [editor] = useLexicalComposerContext()
    const [open, setOpen] = useState(false)
    const imageUrls = useAppSelector(state => state.imageUrls)
    const onInsertImage = ({ url, altText, caption, position }: {}) => {
        editor.update(() => {
            const node = $createImageNode({ src: url, altText: altText })
            $insertNodes([node])
            setOpen(false)
        })
    }
    return (
        <>
            <Button variant={"outline"} onClick={() => setOpen(true)}><Image /></Button>
            <Modal open={open} setOpen={setOpen} title="Insert Image">
                <UploadImage onInsertImage={onInsertImage} imageUrls={imageUrls} />
            </Modal>
        </>

    )
}

export default ImagePlugin