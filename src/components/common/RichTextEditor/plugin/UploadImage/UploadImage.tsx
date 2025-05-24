import Confirm from '@/components/common/Confirm'
import ImageElement from '@/components/common/TextEditor/UploadImage/ImageElement'
import ImageForm from '@/components/form/ImageForm'
import { Input } from '@/components/ui/input'
import { useAppDispatch } from '@/redux/hooks'
import { ImageUrlsActions } from '@/redux/slice/imageUrlsSlide'
import FunctionUtil from '@/util/FunctionUtil'
import { Label } from '@radix-ui/react-label'
import React, { useMemo, useState } from 'react'
type UploadImageProps = {
    imageUrls: string[]
    onInsertImage: ({ url, altText, caption, position }: { url: string, altText: string, caption?: string, position?: string }) => void;
}
const UploadImage = ({ imageUrls, onInsertImage }: UploadImageProps) => {
    const dispatch = useAppDispatch()
    const [imageUrl, setImageUrl] = useState<string>()
    const [removeIndex, setRemoveIndex] = React.useState<number>(-1)
    const [open, setOpen] = React.useState(false)
    const onImageChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            try {
                const file = e.target.files[0]
                await dispatch(ImageUrlsActions.fetchCreate(file))
            } catch (error) {
                console.log(error);
            }
        }
    }
    const onDelete = async () => {
        if (removeIndex === -1) return
        const blogString = localStorage.getItem("blogForm")
        if (blogString) {
            const blogForm = JSON.parse(blogString)
            const imageUrlsUse = FunctionUtil.getImageUrlFromContent(blogForm.content)
            if (imageUrlsUse.some((imageUrl: string) => imageUrls[removeIndex] === imageUrl)) {
                setOpen(true)
            }
        } else {
            await dispatch(ImageUrlsActions.fetchRemove(removeIndex))
        }
    }
    const render = useMemo(() => {
        if (imageUrl) {
            return (
                <ImageForm onSubmit={(value) => onInsertImage({ ...value, url: imageUrl })} />
            )
        }
        return (
            <div>
                <Label>Images</Label>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'>
                    {imageUrls?.map((url, index) => <ImageElement onAdd={() => setImageUrl(url)} onDelete={() => { setOpen(true); setRemoveIndex(index) }} width={128} height={128} className='h-32 w-32' key={url} imageUrl={url} />)}
                    <Label htmlFor='uploadImage' className='flex justify-center items-center w-32 h-32 border-2 border-dashed'>
                        <Input id='uploadImage' className='hidden' type="file" accept='image/*' onChange={(e) => onImageChanged(e)} />
                        Upload image
                    </Label>
                </div>
                <Confirm
                    open={open}
                    onCancel={() => setOpen(false)}
                    onContinue={() => onDelete()}
                    title='Delete image'
                    description='You must delete the image from the content before deleting it from the list'
                />
            </div >
        )
    }, [imageUrl])
    return render;
}

export default UploadImage