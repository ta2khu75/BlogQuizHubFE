import { useEffect, useState } from 'react'
import { useWatch, useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { BlogFormActions } from '@/redux/slice/BlogFormSlice'
import { BlogRequest } from '@/types/request/BlogRequest'
import { useAppSelector } from '@/redux/hooks'
type Props = {
    defalutValue?: BlogRequest
}
const FormSyncToRedux = () => {
    const { control, reset } = useFormContext<BlogRequest>()
    const [isFirstRender, setIsFirstRender] = useState(true)
    const blogForm = useAppSelector((state) => state.blogForm.form)
    const dispatch = useDispatch()
    const formValue = useWatch({ control })
    useEffect(() => {
        if (blogForm) {
            reset(blogForm)
        }
    }, [reset])
    useEffect(() => {
        if (formValue && !isFirstRender)
            dispatch(BlogFormActions.set(formValue))
        setIsFirstRender(false)
    }, [dispatch, formValue])

    return null // không render gì
}
export default FormSyncToRedux;