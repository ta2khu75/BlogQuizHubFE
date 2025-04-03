import AvatarElement from "@/components/elements/header/AvatarElement"
import { Card, CardHeader } from "@/components/ui/card"
import { FollowService } from "@/services/FollowService"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const FollowList = () => {
    const searchParams = useSearchParams()
    const authorId = searchParams.get("id")
    const [followerPage, setFollowerPage] = useState<PageResponse<FollowResponse>>()
    useEffect(() => {
        fetchFollowers()
    }, [authorId])
    const fetchFollowers = () => {
        if (!authorId) return
        FollowService.readPageFollower(authorId).then(res => {
            if (res.success) {
                setFollowerPage(res.data)
            }
        })
    }
    return (
        <div className='flex flex-col gap-4'>
            {
                followerPage?.content?.map(follow => (
                    <Card key={follow.follower.info.id}>
                        <CardHeader className='flex flex-row justify-between items-center'>
                            <Link href={`/profile?id=${follow.follower.info.id}`}><AvatarElement account={follow.follower} /></Link>
                        </CardHeader>
                        {/* <CardContent className='flex flex-col gap-y-2'>
                            <CardTitle>
                                <Link href={`/blog/${StringUtil.convertSlugUrl(blog.title)}-id-${blog.info.id}.html`} className={"hover:underline"}>{blog.title}</Link>
                            </CardTitle>
                            <div className='flex flex-wrap'>
                                {blog.blog_tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                            </div>
                        </CardContent> */}
                    </Card>
                )
                )
            }
        </div>
    )
}

export default FollowList