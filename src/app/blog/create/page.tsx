"use client"
import TextEditor from '@/components/elements/util/TextEditor/TextEditor'
import BlogForm from '@/components/form/BlogForm'
import React, { useState } from 'react'
import { Descendant } from 'slate'

const BlogCreatePage = () => {
    const onSubmit = (data: BlogRequest) => {
        console.log(data);
    }
    const [value, setValue] = useState<Descendant[]>();
    // const { mutateAsync: saveData, isPending } = useUpdateData();
    // const { data, isSuccess } = useData();

    const onChange = (value: Descendant[]) => {
        setValue(value);
    };

    // const onSave = () => {
    //     saveData(value);
    // };
    return (
        // <BlogForm onSubmit={onSubmit} />
        <TextEditor name="post"
            placeholder="Write post"
            onChange={onChange}
            initialValue={[{ type: 'paragraph', children: [{ text: '' }] }]}
        />
        // <BlogForm onSubmit={onSubmit} />
    )
}

export default BlogCreatePage