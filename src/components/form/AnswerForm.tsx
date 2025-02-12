import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FileX2 } from 'lucide-react';
import React from 'react'
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
export const answerSchema = z.object({
    answer: z.string().nonempty(),
    correct: z.boolean().default(false),
    id: z.string().optional()
})
type Props = {
    quizIndex: number,
    answerIndex: number,
    onDelete: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<ExamRequest, any, undefined>
}
const AnswerForm = ({ answerIndex, quizIndex, form, onDelete }: Props) => {
    return (
        <div className='flex items-center gap-4'>
            <FormField control={form.control} name={`quizzes.${quizIndex}.answers.${answerIndex}.correct`}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField control={form.control} name={`quizzes.${quizIndex}.answers.${answerIndex}.answer`} render={({ field }) => (
                <FormItem className='w-full'>
                    <FormControl>
                        <Input type='text' placeholder="Answer" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <Button variant={'destructive'} type='button' onClick={onDelete}><FileX2 /></Button>
        </div>
    )
}

export default AnswerForm