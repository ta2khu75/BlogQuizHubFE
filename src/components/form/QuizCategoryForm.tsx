import ButtonSubmit from '@/components/common/ButtonSubmit'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { QuizCategoryRequest, quizCategorySchema } from '@/types/request/QuizCategoryRequest'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
type Props = {
    onSubmit: (data: QuizCategoryRequest) => void,
    quizCategory?: QuizCategoryResponse
}
const QuizCategoryForm = ({ onSubmit, quizCategory }: Props) => {
    const form = useForm({
        resolver: zodResolver(quizCategorySchema),
        defaultValues: { name: quizCategory?.name ?? "" }
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField control={form.control} name='name' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input type='text' placeholder="Category quiz name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <ButtonSubmit isSubmitting={form.formState.isSubmitting} />
            </form>
        </Form>
    )
}

export default QuizCategoryForm;