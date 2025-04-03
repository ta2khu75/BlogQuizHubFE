import ImageElement from '@/components/elements/util/TextEditor/UploadImage/ImageElement'
import { Input } from '@/components/ui/input'
import { useAppDispatch } from '@/redux/hooks'
import { ImageUrlsActions } from '@/redux/slice/imageUrlsSlide'
import { Label } from '@radix-ui/react-label'
import React from 'react'
type UploadImageProps = {
    imageUrls: string[]
    onAdd: (url: string) => void
}
const UploadImage = ({ imageUrls, onAdd }: UploadImageProps) => {
    const dispatch = useAppDispatch()
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
    return (
        <div>
            <Label>Images</Label>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'>
                {imageUrls?.map((url, index) => <ImageElement onAdd={() => onAdd(url)} onDelete={async () => await dispatch(ImageUrlsActions.fetchRemove(index))} width={128} height={128} className='h-32 w-32' key={url} imageUrl={url} />)}
                <Label htmlFor='uploadImage' className='flex justify-center items-center w-32 h-32 border-2 border-dashed'>
                    <Input id='uploadImage' className='hidden' type="file" accept='image/*' onChange={(e) => onImageChanged(e)} />
                    Upload image
                </Label>
            </div>
        </div>
    )
}

export default UploadImage