import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useIsOwn from '@/hooks/useIsOwn';
import FollowList from '@/components/list/FollowList';
import BlogSearch from '@/components/search/BlogSearch';
import QuizResultSearch from '@/components/search/QuizResultSearch';
import QuizSearch from '@/components/search/QuizSearch';
import TitleContent from '@/components/common/TitleContent';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AccountProfileResponse } from '@/types/response/Account/AccountProfileResponse';
type Props = {
    profile?: AccountProfileResponse
}
const TabContent = ({ profile }: Props) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const tab = searchParams.get('tab') ?? 'blog'
    const isOwn = useIsOwn(profile?.id)
    const onTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('tab', value)
        router.push(`${pathname}?${params.toString()}`)
    }
    return (
        <Tabs defaultValue={tab} onValueChange={(value) => onTabChange(value)}>
            <TabsList className={
                clsx("flex md:grid w-full h-16",
                    isOwn ? "md:grid-cols-4" : "md:grid-cols-3"

                )}>
                <TabsTrigger className='flex flex-col items-center' value="blog">
                    <TitleContent>
                        {profile?.blog_count}
                    </TitleContent>
                    Blogs
                </TabsTrigger>
                <TabsTrigger className='flex flex-col items-center' value="quiz">
                    <TitleContent>
                        {profile?.quiz_count}
                    </TitleContent>
                    Quizzes
                </TabsTrigger>
                <TabsTrigger className='flex flex-col items-center' value="follower">
                    <TitleContent>
                        {profile?.follow_count}
                    </TitleContent>
                    Follower
                </TabsTrigger>
                {isOwn &&
                    <TabsTrigger className='flex flex-col items-center p-4' value="quizResult">
                        Quiz result
                    </TabsTrigger>
                }
            </TabsList>
            <TabsContent value="blog">
                <div className='flex justify-between'>
                    <TitleContent>Blog</TitleContent>
                    {isOwn && <Button><Link href="/blog/create">Create</Link></Button>}
                </div>
                <BlogSearch />
            </TabsContent>
            <TabsContent value='quiz'>
                <div className='flex justify-between'>
                    <TitleContent>Quiz</TitleContent>
                    {isOwn && <Button><Link href={"/quiz/create"}>Create</Link></Button>}
                </div>
                <QuizSearch />
            </TabsContent>
            <TabsContent value='follower'>
                <FollowList />
            </TabsContent>
            <TabsContent value='quizResult'>
                <QuizResultSearch />
            </TabsContent>
        </Tabs >
    )
}

export default TabContent