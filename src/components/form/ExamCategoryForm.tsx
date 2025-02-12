import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const examCategorySchema = z.object({
    name: z.string().min(3)
})
type Props = {
    onSubmit: (data: ExamCategoryRequest) => void,
    examCategory?: ExamCategoryResponse
}
const ExamCategoryForm = ({ onSubmit, examCategory }: Props) => {
    const form = useForm({
        resolver: zodResolver(examCategorySchema),
        defaultValues: { name: examCategory?.name ?? "" }
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField control={form.control} name='name' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input type='text' placeholder="Category exam name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                {form.formState.isSubmitting ? <Button disabled>
                    <Loader2 className="animate-spin" />
                    Please wait
                </Button> :
                    <Button type='submit'>Submit</Button>}
            </form>
        </Form>
    )
}

export default ExamCategoryForm;