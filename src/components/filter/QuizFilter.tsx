"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/hooks/use-toast'
import QuizCategoryService from '@/services/QuizCategoryService'
import QuizService from '@/services/QuizService'
import { QuizLevel } from '@/types/QuizLevel'
import FunctionUtil from '@/util/FunctionUtil'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'

const formSchema: ZodType<QuizSearch> = z.object({
    keyword: z.string().optional(),
    quizCategoryIds: z.array(z.number()).optional(),
    minDuration: z.number().min(0).optional(),
    maxDuration: z.number().min(0).optional(),
    completed: z.boolean().optional(),
    quizLevels: z.array(z.nativeEnum(QuizLevel)).optional(),
})
type Props = {
    setQuizPage: React.Dispatch<React.SetStateAction<PageResponse<QuizResponse> | undefined>>
}
const QuizFilter = ({ setQuizPage }: Props) => {
    const [quizCategories, setQuizCategories] = React.useState<QuizCategoryResponse[]>([])
    const { toast } = useToast()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const searchValues = useMemo(() => ({
        keyword: searchParams.get("keyword") ?? undefined,
        quizCategoryIds: searchParams.getAll("quizCategoryIds").filter((value) => !Number.isNaN(value)).map(Number),
        quizLevels: searchParams.getAll("quizLevels") as QuizLevel[],
        completed: Boolean(searchParams.get("completed")) || undefined,
        minDuration: Number(searchParams.get("minDuration")) || undefined,
        maxDuration: Number(searchParams.get("maxDuration")) || undefined,
        page: Number(searchParams.get("page")) || 1,
        id: searchParams.get("id") ?? undefined,
    }), [searchParams])
    const form = useForm<QuizSearch>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keyword: "",
            quizCategoryIds: [],
            minDuration: undefined,
            maxDuration: undefined,
            completed: undefined,
            quizLevels: [],
        },
        shouldUnregister: false
    })
    useEffect(() => {
        fetchReadAllQuizCategory()
    }, [])
    useEffect(() => {
        form.reset({ ...searchValues, author_id: searchValues.id })
        fetchSearch()
    }, [searchValues])

    const createQueryString = useCallback(
        (search: QuizSearch) => {
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
    const fetchSearch = () => {
        QuizService.search({ ...searchValues, authorId: searchValues.id }).then((res) => {
            if (res.success) {
                setQuizPage(res.data)
            } else {
                toast({ title: "Search failed", description: res.message_error, variant: "destructive" })
            }
        })
    }
    const fetchReadAllQuizCategory = () => {
        QuizCategoryService.readAll().then(res => {
            if (res.success) {
                setQuizCategories(res.data)
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    const onFilter = (data: QuizSearch) => {
        router.push(`${pathname}?${createQueryString(data)}`)
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
                                <FormField control={form.control} name='minDuration' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Min</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder="Min"
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name='maxDuration' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder="Max"
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="quizCategoryIds"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Quiz Categories</FormLabel>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        {quizCategories.map((category) => (
                                            <FormField
                                                key={category.id}
                                                control={form.control}
                                                name="quizCategoryIds"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={category.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(category.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value ?? [], category.id])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== category.id
                                                                                )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">
                                                                {category.name}
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
                        <FormField
                            control={form.control}
                            name="completed"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Complete status</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => field.onChange(value === 'undefined' ? undefined : value === 'true')}
                                            value={field.value === undefined ? 'undefined' : field.value.toString()}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value={`undefined`} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    All
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value={'false'} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Not completed
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value={'true'} />
                                                </FormControl>
                                                <FormLabel className="font-normal">Completed</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quizLevels"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Quiz level</FormLabel>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        {Object.entries(QuizLevel).map((level) => (
                                            <FormField
                                                key={level[0]}
                                                control={form.control}
                                                name="quizLevels"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={level[0]}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(level[0])}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value ?? [], level[0]])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== level[0]
                                                                                )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">
                                                                {level[0]}
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

export default QuizFilter 