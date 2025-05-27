import { useEffect, useState } from 'react'
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
            const sanitizedFormValue: BlogRequest = {
                ...formValue,
                content: formValue.content || '', // Ensure content is a string
                title: formValue.title || '', // Ensure title is a string
                tags: (formValue.tags || []).filter(tag => tag.id !== undefined) as BlogTag[], // Ensure tags is an array of BlogTag
                quiz_ids: formValue.quiz_ids || [], // Ensure quiz_ids is an array
                access_modifier: formValue.access_modifier || '' // Ensure access_modifier is a string
            };
            dispatch(BlogFormActions.set(sanitizedFormValue));
        }
    }, [dispatch, formValue])

    return null // không render gì
}
export default BlogFormSync;