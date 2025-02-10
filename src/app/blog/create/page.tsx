"use client"
import BlogForm from '@/components/form/BlogForm'
import React from 'react'

const BlogCreatePage = () => {
    const onSubmit = (data: BlogRequest) => {
        console.log(data);

    }
    return (
        <BlogForm onSubmit={onSubmit} />
    )
}

export default BlogCreatePage