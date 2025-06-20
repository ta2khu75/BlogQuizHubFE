import { useEffect, useRef } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { BlogRequest } from '@/types/request/BlogRequest'
import { useAppSelector } from '@/redux/hooks'
import _ from 'lodash'
type Props = {
    setFormActive: (value: boolean) => void
}
const BlogFormInitializer = ({ setFormActive }: Props) => {
    const { reset, control } = useFormContext<BlogRequest>()
    const blogForm = useAppSelector(state => state.blogForm.form)
    const initializedRef = useRef(false)
    const { replace: replaceTags } = useFieldArray({ control, name: "tags" })
    const { replace: replaceQuizzes } = useFieldArray({ control, name: "quiz_ids" })
    useEffect(() => {
        if (blogForm && !initializedRef.current && reset) {
            setTimeout(() => {
                console.log("blog form");
                reset(blogForm);
                // replaceTags(blogForm.tags);
                // replaceQuizzes(blogForm.quiz_ids ?? []);
                initializedRef.current = true
                setFormActive(true)
            });
            // const parsed = blogRequestSchema.parse(blogForm)
            // reset(structuredClone(parsed) as BlogRequest)
            // console.log("blog form init", blogForm);
            // reset(blogForm)
        }
    }, [blogForm, reset])

    return null
}

export default BlogFormInitializer
