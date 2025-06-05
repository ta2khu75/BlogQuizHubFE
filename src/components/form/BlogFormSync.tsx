import { useEffect } from 'react'
import { useWatch, useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { BlogFormActions } from '@/redux/slice/BlogFormSlice'
import { BlogRequest } from '@/types/request/BlogRequest'
import { useAppSelector } from '@/redux/hooks'
const BlogFormSync = () => {
    const { control, reset } = useFormContext<BlogRequest>()
    const blogForm = useAppSelector((state) => state.blogForm.form)
    const dispatch = useDispatch()
    const formValue = useWatch({ control })
    useEffect(() => {
        if (blogForm) {
            return reset(blogForm)
        }
    }, [])
    useEffect(() => {
        if (formValue) {
            dispatch(BlogFormActions.set(formValue as BlogRequest));
        }
    }, [dispatch, formValue])

    return null
}
export default BlogFormSync;