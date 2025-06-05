import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BlogService } from '@/services/BlogService'
import { BlogTagService } from '@/services/BlogTagService'
import { BlogResponse } from '@/types/response/BlogResponse'
import { handleMutation } from '@/util/mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo } from 'react'
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
const BlogFilter = ({ setBlogPage }: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const searchValues = useMemo(() => ({
        keyword: searchParams.get("keyword") ?? undefined,
        blogTagNames: searchParams.getAll("blogTagNames"),
        minView: Number(searchParams.get("minView")) || undefined,
        maxView: Number(searchParams.get("maxView")) || undefined,
        page: Number(searchParams.get("page")) || 1,
        authorId: searchParams.get("id") ?? undefined,
    }), [searchParams])
    const [blogTagNamesList, setBlogTagNamesList] = React.useState<string[]>([])
    const createQueryString = useCallback(
        (search: BlogSearch) => {
            console.log(search);

            const params = new URLSearchParams(searchParams.toString())
            Object.entries(search).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    params.delete(key)
                    value.forEach(val => params.append(key, val))
                } else if (value === undefined) {
                    params.delete(key)
                }
                else {
                    params.set(key, value as string)
                }
            })
            return params.toString()
        },
        [searchParams]
    )
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
        form.reset(searchValues)
        fetchSearch()
    }, [searchValues])
    const fetchBlogTagNames = () => {
        handleMutation(() => BlogTagService.readAll(), res => {
            setBlogTagNamesList(res.data.map((tag) => tag.name))
        })
    }
    const fetchSearch = () => {
        handleMutation(() => BlogService.search(searchValues), res => {
            setBlogPage(res.data)
        });
    }
    const onFilter = (data: BlogSearch) => {
        const queryString = createQueryString(data)
        router.push(`${pathname}?${queryString}`)
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