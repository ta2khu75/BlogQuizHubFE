import Pageination from '@/components/elements/util/Pageination'
import BlogFilter from '@/components/filter/BlogFilter'
import BlogList from '@/components/list/BlogList'
import React from 'react'

const BlogSearch = () => {
    const [blogPage, setBlogPage] = React.useState<PageResponse<BlogResponse>>()
    return (
        <div>
            <BlogFilter setBlogPage={setBlogPage} />
            <BlogList blogPage={blogPage} />
            {blogPage && <Pageination<BlogResponse> page={blogPage} />}
        </div>
    )
}

export default BlogSearch