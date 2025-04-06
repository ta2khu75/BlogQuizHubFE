"use client"
import BlogList from '@/components/list/BlogList';
import BlogSearch from '@/components/filter/BlogFilter';
import React from 'react';

const SearchPage = () => {
    const [blogPage, setBlogPage] = React.useState<PageResponse<BlogResponse>>()
    return (
        <div className='flex'>
            <BlogSearch setBlogPage={setBlogPage} />
            <BlogList blogPage={blogPage} />
        </div>
    )
}

export default SearchPage