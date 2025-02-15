import AnswerForm, { answerSchema } from '@/components/form/AnswerForm'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QuizType } from '@/types/QuizType'
import React, { useState } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { FilePlus2 } from 'lucide-react';
export const quizSchema = z.object({
    id: z.number().optional(),
    question: z.string().min(3),
    quiz_type: z.nativeEnum(QuizType),
    answers: z.array(answerSchema)
})
type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<ExamRequest, any, undefined>
    quizIndex: number
}
const QuizForm = ({ form, quizIndex }: Props) => {
    const initAnswer = { answer: "", correct: false }
    const quizName: `quizzes.${number}` = `quizzes.${quizIndex}`;
    const { fields: answerFields, append: appendAnswer, remove: removeAnswer } = useFieldArray({
        control: form.control,
        name: `${quizName}.answers`,
    });
    const [quizType, setQuizType] = useState<QuizType>(form.getValues(`${quizName}.quiz_type`) as QuizType);
    const onQuizTypeChange = (value: string) => {
        if (value === QuizType.MULTIPLE_CHOICE) {
            const answers = form.getValues(`${quizName}.answers`);
            const correctAnswersIndex = answers.findIndex((answer) => answer.correct);
            form.setValue(`${quizName}.answers`, answers.map((answer, answerIndex) => {
                if (answerIndex === correctAnswersIndex) {
                    return { ...answer, correct: true }
                }
                return { ...answer, correct: false }
            }))
        }
        form.setValue(`${quizName}.quiz_type`, value as QuizType)
        setQuizType(value as QuizType)
    }
    return (
        <div className='w-full flex flex-col gap-4'>
            <FormField control={form.control} name={`${quizName}.question`} render={({ field }) => (
                <FormItem className='w-full'>
                    <FormLabel>Question</FormLabel>
                    <FormControl >
                        <Input type='text' placeholder="Question" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField
                control={form.control}
                name={`${quizName}.quiz_type`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Quiz type</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={(value) => onQuizTypeChange(value)}
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
                {
                    answerFields.length < 2 && <p className='text-red-500'>At least 2 answers are required</p>
                }
                {
                    !form.getValues(`${quizName}.answers`).some((answer) => answer.correct) && <p className='text-red-500'>At least one answer must be marked as correct</p>
                }
                <div className='flex items-center gap-x-2'>
                    <Button type='button' className='bg-green-600 hover:bg-green-500' onClick={() => appendAnswer(initAnswer)}><FilePlus2 /></Button>
                    <FormLabel className='flex items-center gap-x-2'> Answers</FormLabel>
                </div>

                {quizType === QuizType.MULTIPLE_CHOICE ?
                    <>
                        {answerFields.map((answer, answerIndex) => (
                            <AnswerForm key={`${quizIndex}${answerIndex}`} quizType={form.getValues(`${quizName}.quiz_type`)} answerIndex={answerIndex} quizIndex={quizIndex} onDelete={() => removeAnswer(answerIndex)} form={form} />
                        ))}
                    </>
                    :
                    <RadioGroup value={`${form.getValues(`${quizName}.answers`).findIndex((answer) => answer.correct)}`} onValueChange={(value) => {
                        const answers = form.getValues(`${quizName}.answers`);
                        form.setValue(`${quizName}.answers`, answers.map((answer, index) => {
                            if (index === Number(value)) {
                                return { ...answer, correct: true }
                            } return { ...answer, correct: false }
                        }));
                    }}>
                        {answerFields.map((answer, answerIndex) => (
                            <AnswerForm key={`${quizIndex}${answerIndex}`} quizType={quizType} answerIndex={answerIndex} quizIndex={quizIndex} onDelete={(() => removeAnswer(answerIndex))} form={form} />
                        ))}
                    </RadioGroup>
                }
                <FormMessage />
            </FormItem>
        </div>
    )
}

export default QuizForm