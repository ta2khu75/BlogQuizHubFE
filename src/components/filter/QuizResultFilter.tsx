import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import QuizCategoryService from '@/services/QuizCategoryService'
import QuizResultService from '@/services/QuizResultService'
import FunctionUtil from '@/util/FunctionUtil'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'
const formSchema: ZodType<QuizResultSearch> = z.object({
    keyword: z.string().optional(),
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
    quizCategoryIds: z.array(z.number()).optional(),
})
type Props = {
    setQuizResultPage: React.Dispatch<React.SetStateAction<PageResponse<QuizResultResponse> | undefined>>
}
const QuizResultFilter = ({ setQuizResultPage }: Props) => {
    const { toast } = useToast()
    const router = useRouter()
    const pathname = usePathname()
    const [quizCategories, setQuizCategories] = React.useState<QuizCategoryResponse[]>([])
    const form = useForm<QuizResultSearch>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keyword: "",
            fromDate: undefined,
            toDate: undefined,
            quizCategoryIds: []
        },
        shouldUnregister: false
    })
    const searchParams = useSearchParams()
    const searchValues = useMemo(() => ({
        keyword: searchParams.get("keyword") ?? undefined,
        quizCategoryIds: searchParams.getAll("quizCategoryIds").filter((value) => !Number.isNaN(value)).map(Number),
        fromDate: searchParams.get("fromDate") || undefined,
        toDate: searchParams.get("toDate") || undefined,
        page: Number(searchParams.get("page")) || 1,
        id: searchParams.get("id") ?? undefined,
    }), [searchParams])
    useEffect(() => {
        fetchReadAllQuizCategory()
    }, [])
    useEffect(() => {
        form.reset({ ...searchValues, authorId: searchValues.id })
        fetchSearchQuizResult()
    }, [searchParams])
    const fetchSearchQuizResult = () => {
        QuizResultService.search({
            ...searchValues, authorId: searchValues.id,
            fromDate: FunctionUtil.toISOString(searchValues.fromDate), toDate: FunctionUtil.toISOString(searchValues.toDate)
        }).then(res => {
            if (res.success) {
                setQuizResultPage(res.data)
            } else {
                toast({ variant: "destructive", description: res.message_error })
            }
        }).catch(err => toast({ variant: "destructive", description: FunctionUtil.showError(err) }))
    }
    const onFilter = (data: QuizResultSearch) => {
        router.push(`${pathname}?${FunctionUtil.createQueryString(new URLSearchParams(searchParams.toString()), data)}`)
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
                            <Label className="text-base">Range date</Label>
                            <div className='grid grid-cols-2 gap-4'>
                                <FormField control={form.control} name='fromDate' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>From</FormLabel>
                                        <FormControl>
                                            <Input type='date' placeholder="from" {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name='toDate' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>To</FormLabel>
                                        <FormControl>
                                            <Input type='date' placeholder="to"{...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
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
                                        <FormLabel className="text-base">Quiz categories</FormLabel>
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
                        <Button type='submit' className='w-full'>Filter</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default QuizResultFilter