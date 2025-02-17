import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { QuizType } from '@/types/QuizType';
import { FileX2 } from 'lucide-react';
import { memo, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
export const answerSchema = z.object({
    answer: z.string().nonempty(),
    correct: z.boolean().default(false),
    id: z.string().optional(),
})
type Props = {
    quizIndex: number,
    answerIndex: number,
    quizType: QuizType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<ExamRequest, any, undefined>
    onDelete: () => void
}
const AnswerForm = memo(({ answerIndex, quizIndex, form, quizType, onDelete }: Props) => {
    const answerName: `quizzes.${number}.answers.${number}` = `quizzes.${quizIndex}.answers.${answerIndex}`;
    // const answersLenght = form.watch(`quizzes.${quizIndex}.answers`).length;
    // const correct = form.watch(`${answerName}.correct`);
    const answers = useMemo(() => form.watch(`quizzes.${quizIndex}.answers`), [form.getValues(`quizzes.${quizIndex}.answers`)]);
    const correct = useMemo(() => form.watch(`${answerName}.correct`), [form.getValues(`${answerName}.correct`)]);


    return (
        <div className='flex items-center gap-4'>
            <FormField control={form.control} name={`${answerName}.correct`}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            {quizType === QuizType.MULTIPLE_CHOICE ?
                                <Checkbox checked={correct} onCheckedChange={field.onChange} /> :
                                <RadioGroupItem value={`${answerIndex}`} checked={correct} onSelect={field.onChange} />
                            }
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField control={form.control} name={`${answerName}.answer`} render={({ field }) => (
                <FormItem className='w-full'>
                    <FormControl>
                        <Input type='text' placeholder="Answer" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <Button variant={'destructive'} disabled={answers.length <= 2} type='button' onClick={onDelete}><FileX2 /></Button>
        </div >
    )
})
AnswerForm.displayName = "AnswerForm";
export default AnswerForm