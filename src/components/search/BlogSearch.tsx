import Paginator from '@/components/common/Paginator'
import BlogFilter from '@/components/filter/BlogFilter'
import BlogList from '@/components/list/BlogList'
import React from 'react'

const BlogSearch = () => {
    const [blogPage, setBlogPage] = React.useState<PageResponse<BlogResponse>>()
    return (
        <div className='flex'>
            <div className='w-1/3 sm:block hidden'>
                <BlogFilter setBlogPage={setBlogPage} />
            </div>
            <div className='w-2/3'>
                <BlogList blogPage={blogPage} />
                {blogPage && <Paginator page={blogPage} />}
            </div>
        </div>
    )
}

export default BlogSearch