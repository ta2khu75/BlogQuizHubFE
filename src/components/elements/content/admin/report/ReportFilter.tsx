import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import ReportService from '@/services/ReportService'
import { ReportSearch } from '@/types/request/search/ReportSearch'
import { ReportResponse } from '@/types/response/ReportResponse'
import FunctionUtil from '@/util/FunctionUtil'
import { handleMutation } from '@/util/mutation'
import ParseHelper from '@/util/ParseHelper'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
type Props = {
    setReportPage: React.Dispatch<React.SetStateAction<PageResponse<ReportResponse> | undefined>>
}
const ReportFilter = ({ setReportPage }: Props) => {
    const { toast } = useToast()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const form = useForm<ReportSearch>()
    const searchValues: ReportSearch = useMemo(() => ({
        keyword: ParseHelper.parseString(searchParams.get("keyword")),
        from_date: ParseHelper.parseDate(searchParams.get("fromDate")),
        to_date: ParseHelper.parseDate(searchParams.get("toDate")),
        page: Number(searchParams.get("page")) || 1,
        author_id: searchParams.get("id") ?? undefined,
    }), [searchParams])
    useEffect(() => {
        form.reset(searchValues)
        fetchSearchReport(searchValues)
    }, [searchValues])
    const fetchSearchReport = (search: ReportSearch) => {
        handleMutation<PageResponse<ReportResponse>>(() => ReportService.search(search), (res) => setReportPage(res.data), (err) => toast({ variant: "destructive", title: "Search failed", description: err.message }))
    }
    const onFilter = (data: QuizResultSearch) => {
        router.push(`${pathname}?${FunctionUtil.createQueryString(new URLSearchParams(searchParams.toString()), data)}`)
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

export default ReportFilter