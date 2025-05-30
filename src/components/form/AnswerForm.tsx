import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { QuestionType } from '@/types/QuestionType';
import { QuizRequest } from '@/types/request/QuizRequest';
import { FileX2 } from 'lucide-react';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
type Props = {
    questionIndex: number,
    answerIndex: number,
    questionType: QuestionType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<QuizRequest, any, undefined>
    onDelete: () => void
}
const AnswerForm = ({ answerIndex, questionIndex, form, questionType, onDelete }: Props) => {
    const answersName: `questions.${number}.answers` = `questions.${questionIndex}.answers`;
    const answerName: `questions.${number}.answers.${number}` = `${answersName}.${answerIndex}`;
    const answersLength = form.getValues(answersName).length
    const correct = form.watch(`${answerName}.correct`);
    useEffect(() => {
        if (correct && form.formState.errors?.questions?.[questionIndex]?.answers) {
            form.clearErrors(`${answersName}.root`);
        }
    }, [correct])
    return (
        <FormField control={form.control} name={`${answerName}.content`} render={({ field: fieldInput }) => (
            <div>
                <div className='flex items-center gap-4'>
                    <FormField control={form.control} name={`${answerName}.correct`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    {questionType === QuestionType.MULTIPLE_CHOICE ?
                                        <Checkbox checked={correct} onCheckedChange={field.onChange} /> :
                                        <RadioGroupItem checked={correct} value={`${answerIndex}`} onSelect={field.onChange} />
                                    }
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormItem className='w-full'>
                        <FormControl>
                            <Input type='text' placeholder="Answer" defaultValue={fieldInput.value} onChange={fieldInput.onChange} />
                        </FormControl>
                    </FormItem>
                    <Button variant={'destructive'}
                        disabled={answersLength <= 2}
                        type='button' onClick={onDelete}><FileX2 /></Button>
                </div>
                <FormMessage />
            </div>
        )} />
    )
}
export default AnswerForm