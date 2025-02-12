import AnswerForm, { answerSchema } from '@/components/form/AnswerForm'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QuizType } from '@/types/QuizType'
import React from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { FilePlus2 } from 'lucide-react';
export const quizSchema = z.object({
    question: z.string().min(3),
    quiz_type: z.nativeEnum(QuizType),
    answers: z.array(answerSchema).nonempty()
})
type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<ExamRequest, any, undefined>
    quizIndex: number
}
const QuizForm = ({ form, quizIndex }: Props) => {
    const { fields: answerFields, append: appendAnswer, remove: removeAnswer } = useFieldArray({
        control: form.control,
        name: `quizzes.${quizIndex}.answers`,
    });
    const onAddAnswer = () => {
        appendAnswer({ answer: "", correct: false })
    }
    console.log(
        form.getValues(`quizzes.${quizIndex}.quiz_type`)
    );
    return (
        <div className='w-full'>
            <FormField control={form.control} name={`quizzes.${quizIndex}.question`} render={({ field }) => (
                <FormItem className='w-full'>
                    <FormLabel>Question</FormLabel>
                    <FormControl >
                        <Input type='text' placeholder="Question" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            {form.getValues(`quizzes.${quizIndex}.quiz_type`) === QuizType.MULTIPLE_CHOICE ? "true" : "false"}
            <FormField
                control={form.control}
                name={`quizzes.${quizIndex}.quiz_type`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Quiz type</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-y-1"
                            >
                                {Object.entries(QuizType).map((item, index) => (
                                    <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={item[0]} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {item[1]}
                                        </FormLabel>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormItem className='mt-4'>
                <div className='flex items-center gap-x-2'>
                    <Button type='button' className='bg-green-600 hover:bg-green-500' onClick={onAddAnswer}><FilePlus2 /></Button>
                    <FormLabel onClick={onAddAnswer} className='flex items-center gap-x-2'> Answers</FormLabel>
                </div>
                {answerFields.map((answer, answerIndex) => (
                    <AnswerForm key={answerIndex} answerIndex={answerIndex} quizIndex={quizIndex} onDelete={() => removeAnswer(answerIndex)} form={form} />
                ))}
            </FormItem>
        </div>
    )
}

export default QuizForm