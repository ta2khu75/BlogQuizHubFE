import { useEffect } from "react";
import { useWatch, useFormContext, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { BlogFormActions } from "@/redux/slice/BlogFormSlice";
import { BlogRequest, blogRequestSchema } from "@/types/request/BlogRequest";
import { useAppSelector } from "@/redux/hooks";
import _ from "lodash";
type Props = {
  defaultValue: BlogRequest;
  formActive: boolean;
};
const BlogFormSync = ({ defaultValue, formActive }: Props) => {
  const { control } = useFormContext<BlogRequest>();
  const formValue = useWatch({ control });
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("blog form sync", formValue);
    console.log(formActive);
    const bloggg = _.cloneDeep(formValue);
    console.log("bloggg", bloggg);

    if (formValue && formActive) {
      dispatch(BlogFormActions.set(_.cloneDeep(formValue) as BlogRequest));
    }
  }, [dispatch, formValue, formActive]);

  return null;
};
export default BlogFormSync;
// import { useEffect, useRef } from 'react'
// import { useWatch, useFormContext } from 'react-hook-form'
// import { useDispatch } from 'react-redux'
// import { BlogFormActions } from '@/redux/slice/BlogFormSlice'
// import { BlogRequest } from '@/types/request/BlogRequest'
// import { useAppSelector } from '@/redux/hooks'
// import isEqual from 'lodash/isEqual'

// const BlogFormSync = () => {
//     const { control, reset } = useFormContext<BlogRequest>()
//     const blogForm = useAppSelector((state) => state.blogForm.form)
//     const dispatch = useDispatch()
//     const formValue = useWatch({ control })

//     // Cờ đánh dấu đã reset chưa
//     const hasResetRef = useRef(false)

//     // Chỉ reset 1 lần duy nhất khi form chưa có gì
//     useEffect(() => {
//         if (!hasResetRef.current && blogForm) {
//             reset(blogForm)
//             hasResetRef.current = true
//         }
//     }, [blogForm, reset])

//     // Đồng bộ ngược lại Redux khi form thay đổi
//     useEffect(() => {
//         if (formValue && !isEqual(formValue, blogForm)) {
//             dispatch(BlogFormActions.set(formValue as BlogRequest))
//         }
//     }, [formValue, blogForm, dispatch])

//     return null
// }

// export default BlogFormSync

// import { useEffect, useRef } from 'react'
// import { useWatch, useFormContext } from 'react-hook-form'
// import { useDispatch } from 'react-redux'
// import { BlogFormActions } from '@/redux/slice/BlogFormSlice'
// import { BlogRequest } from '@/types/request/BlogRequest'
// import { useAppSelector } from '@/redux/hooks'
// import isEqual from 'lodash/isEqual'

// const BlogFormSync = () => {
//     const { control, reset } = useFormContext<BlogRequest>()
//     const blogForm = useAppSelector((state) => state.blogForm.form)
//     const dispatch = useDispatch()
//     const formValue = useWatch({ control })

//     // Flag to skip dispatch immediately after reset
//     const justResetRef = useRef(false)

//     // Reset form when blogForm is loaded
//     useEffect(() => {
//         if (blogForm) {
//             reset(blogForm)
//             justResetRef.current = true // Avoid dispatch right after reset
//         }
//     }, [blogForm, reset])

//     // Sync form data to Redux (except right after reset)
//     useEffect(() => {
//         if (justResetRef.current) {
//             justResetRef.current = false
//             return
//         }

//         if (formValue && !isEqual(formValue, blogForm)) {
//             dispatch(BlogFormActions.set(formValue as BlogRequest))
//         }
//     }, [formValue, blogForm, dispatch])

//     return null
// }

// export default BlogFormSync
