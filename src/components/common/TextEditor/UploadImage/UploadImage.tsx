import Confirm from '@/components/common/Confirm'
import ImageElement from '@/components/common/TextEditor/UploadImage/ImageElement'
import { Input } from '@/components/ui/input'
import { useAppDispatch } from '@/redux/hooks'
import { ImageUrlsActions } from '@/redux/slice/imageUrlsSlide'
import FunctionUtil from '@/util/FunctionUtil'
import { Label } from '@radix-ui/react-label'
import React from 'react'
type UploadImageProps = {
    imageUrls: string[]
    onAdd: (url: string) => void
}
const UploadImage = ({ imageUrls, onAdd }: UploadImageProps) => {
    const dispatch = useAppDispatch()
    const [showConfirm, setShowConfirm] = React.useState(false)
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
    const onDeleteImage = async (index: number) => {
        const blogString = localStorage.getItem("blogForm")
        if (blogString) {
            const blogForm = JSON.parse(blogString)
            const imageUrlsUse = FunctionUtil.getImageUrlFromContent(blogForm.content)
            if (imageUrlsUse.some((imageUrl: string) => imageUrls[index] === imageUrl)) {
                setShowConfirm(true)
            }
        } else {
            await dispatch(ImageUrlsActions.fetchRemove(index))
        }
    }
    return (
        <div>
            <Label>Images</Label>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'>
                {imageUrls?.map((url, index) => <ImageElement onAdd={() => onAdd(url)} onDelete={() => onDeleteImage(index)} width={128} height={128} className='h-32 w-32' key={url} imageUrl={url} />)}
                <Label htmlFor='uploadImage' className='flex justify-center items-center w-32 h-32 border-2 border-dashed'>
                    <Input id='uploadImage' className='hidden' type="file" accept='image/*' onChange={(e) => onImageChanged(e)} />
                    Upload image
                </Label>
            </div>
            <Confirm
                open={showConfirm}
                onCancel={() => setShowConfirm(false)}
                title='Delete image'
                description='You must delete the image from the content before deleting it from the list'
            />
        </div >// 
    )
}

export default UploadImage