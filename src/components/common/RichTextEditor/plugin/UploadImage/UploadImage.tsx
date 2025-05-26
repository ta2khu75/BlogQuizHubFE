import Confirm from '@/components/common/Confirm'
import { ImageSize } from '@/components/common/RichTextEditor/plugin/nodes/ImageNode'
import ImageElement from '@/components/common/RichTextEditor/plugin/UploadImage/ImageElement'
import TitleContent from '@/components/common/TitleContent'
import ImageForm, { ImageAttributes } from '@/components/form/ImageForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { ImageUrlsActions } from '@/redux/slice/imageUrlsSlide'
import FunctionUtil from '@/util/FunctionUtil'
import { Label } from '@radix-ui/react-label'
import { ArrowBigLeft } from 'lucide-react'
import React, { useCallback, useState } from 'react'

type Props = {
    onInsertImage: (params: {
        src: string
        altText?: string
        caption?: string
        size?: ImageSize
    }) => void
    value?: ImageAttributes
}

const UploadImage = ({ onInsertImage, value }: Props) => {
    const imageUrls = useAppSelector((state) => state.imageUrls)
    const dispatch = useAppDispatch()

    const [imageUrl, setImageUrl] = useState<string>()
    const [removeIndex, setRemoveIndex] = useState(-1)

    const onImageChanged = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            try {
                await dispatch(ImageUrlsActions.fetchCreate(e.target.files[0]))
            } catch (error) {
                console.error(error)
            }
        }
    }, [dispatch])

    const onDelete = useCallback(async () => {
        const blogString = localStorage.getItem('blogForm')
        if (blogString) {
            const blogForm = JSON.parse(blogString)
            const usedImages = FunctionUtil.getImageUrlFromContent(blogForm.content)
            const urlToDelete = imageUrls[removeIndex]
            if (usedImages.includes(urlToDelete)) {
                setRemoveIndex(-1)
                return
            }
        }
        dispatch(ImageUrlsActions.fetchRemove(removeIndex))
    }, [removeIndex, dispatch])

    if (imageUrl) {
        return (
            <div>
                <Button onClick={() => setImageUrl(undefined)} variant="ghost">
                    <ArrowBigLeft /> Back
                </Button>
                <div>
                    <TitleContent className="text-center">Info image</TitleContent>
                    <ImageForm value={value} onSubmit={(value) => onInsertImage({ ...value, src: imageUrl })} />
                </div>
            </div>
        )
    }

    return (
        <div>
            <Label>Images</Label>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
                {imageUrls.map((url, index) => (
                    <ImageElement
                        key={url}
                        imageUrl={url}
                        width={128}
                        height={128}
                        className="h-32 w-32"
                        onAdd={() => setImageUrl(url)}
                        onDelete={() => setRemoveIndex(index)}
                    />
                ))}
                <Label htmlFor="uploadImage" className="flex justify-center items-center w-32 h-32 border-2 border-dashed">
                    <Input id="uploadImage" className="hidden" type="file" accept="image/*" onChange={onImageChanged} />
                    Upload image
                </Label>
            </div>

            <Confirm
                open={removeIndex >= 0}
                onCancel={() => setRemoveIndex(-1)}
                onContinue={() => onDelete()}
                title="Delete image"
                description="You must delete the image from the content before deleting it from the list"
            />
        </div>
    )
}

export default UploadImage
