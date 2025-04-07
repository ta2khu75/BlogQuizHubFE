import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { BlogService } from '@/services/BlogService'
import { BlogTagService } from '@/services/BlogTagService'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'

const formSchema: ZodType<BlogSearch> = z.object({
    keyword: z.string().optional(),
    blogTagNames: z.array(z.string()).optional(),
    minView: z.number().min(0).optional(),
    maxView: z.number().min(0).optional(),
})
type Props = {
    setBlogPage: React.Dispatch<React.SetStateAction<PageResponse<BlogResponse> | undefined>>
}
// Get a new searchParams string by merging the current
// searchParams with a provided key/value pair
// const createQueryString = useCallback(
//     (name: string, value: string) => {
//         const params = new URLSearchParams(searchParams.toString())
//         params.set(name, value)
//         return params.toString()
//     },
//     [searchParams]
// )
const BlogFilter = ({ setBlogPage }: Props) => {
    const { toast } = useToast()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const keyword = searchParams.get("keyword") ?? undefined
    const blogTagNames = searchParams.getAll("blogTagNames")
    const minView = searchParams.get("minView") ? Number(searchParams.get("minView")) : undefined
    const maxView = searchParams.get("maxView") ? Number(searchParams.get("maxView")) : undefined
    const page = searchParams.get("page") ?? 1
    const id = searchParams.get("id") ?? undefined
    const [blogTagNamesList, setBlogTagNamesList] = React.useState<string[]>([])
    const form = useForm<BlogSearch>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keyword: "",
            blogTagNames: [],
            minView: undefined,
            maxView: undefined
        },
        shouldUnregister: false
    })
    useEffect(() => {
        fetchBlogTagNames()
    }, [])
    useEffect(() => {
        fetchSearch()
    }, [keyword, JSON.stringify(blogTagNames), minView, maxView, page])
    const fetchBlogTagNames = () => {
        BlogTagService.readAll().then((res) => {
            setBlogTagNamesList(res.data.map((tag) => tag.name))
        }).catch((err) => {
            console.log(err)
        })
    }
    const fetchSearch = () => {
        if (keyword) form.setValue("keyword", keyword)
        if (blogTagNames && blogTagNames.length > 0) form.setValue("blogTagNames", blogTagNames)
        if (minView) form.setValue("minView", Number(minView))
        if (maxView) form.setValue("maxView", Number(maxView))
        BlogService.search({ keyword, blogTagNames, minView, maxView, page: Number(page), authorId: id }).then((res) => {
            if (res.success) {
                setBlogPage(res.data)
            } else {
                toast({ title: "Search failed", description: res.message_error, variant: "destructive" })
            }
        })
    }
    const onFilter = (data: BlogSearch) => {
        const { keyword, blogTagNames, minView, maxView } = data
        const stringParts: string[] = []
        if (keyword) stringParts.push(`keyword=${keyword}`)
        if (blogTagNames && blogTagNames.length > 0) blogTagNames.forEach((tag) => stringParts.push(`blogTagNames=${tag}`))
        if (minView) stringParts.push(`minView=${minView}`)
        if (maxView) stringParts.push(`maxView=${maxView}`)
        if (id) stringParts.push(`id=${id}`)
        if (stringParts.length > 0) {
            const queryString = stringParts.join("&")
            router.push(`${pathname}?${queryString}`)
        } else {
            router.push(pathname)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Filter
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFilter)} className='flex flex-col space-y-4'>
                        <FormField control={form.control} name='keyword' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Keyword</FormLabel>
                                <FormControl>
                                    <Input placeholder="Keyword" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <div>
                            <Label className="text-base">View range</Label>
                            <div className='grid grid-cols-2 gap-4'>
                                <FormField control={form.control} name='minView' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Min</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder="Min"
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name='maxView' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder="Max"
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="blogTagNames"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Blog tag</FormLabel>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        {blogTagNamesList.map((blogTag) => (
                                            <FormField
                                                key={blogTag}
                                                control={form.control}
                                                name="blogTagNames"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={blogTag}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(blogTag)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value ?? [], blogTag])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== blogTag
                                                                                )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">
                                                                {blogTag}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='w-full'>Filter</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default BlogFilter 