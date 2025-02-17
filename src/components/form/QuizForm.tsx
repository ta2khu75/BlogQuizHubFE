import AnswerForm, { answerSchema } from '@/components/form/AnswerForm'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QuizType } from '@/types/QuizType'
import React, { useEffect } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { FilePlus2 } from 'lucide-react';
export const quizSchema = z.object({
    id: z.number().optional(),
    question: z.string().nonempty(),
    quiz_type: z.nativeEnum(QuizType),
    answers: z.array(answerSchema).refine((answers) => answers.some((answer) => answer.correct), { message: 'At least one answer must be correct' }),
})
type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<ExamRequest, any, undefined>
    quizIndex: number
}
const QuizForm = ({ form, quizIndex }: Props) => {
    const quizName: `quizzes.${number}` = `quizzes.${quizIndex}`;
    const quizType = form.watch(`${quizName}.quiz_type`)
    const initAnswer = { answer: "", correct: false }
    const { fields: answerFields, append: appendAnswer, remove: removeAnswer } = useFieldArray({
        control: form.control,
        name: `${quizName}.answers`,
        rules: { minLength: 2 },
    });
    useEffect(() => {
        if (quizType === QuizType.SINGLE_CHOICE) {
            const answers = form.getValues(`${quizName}.answers`);
            const correctAnswersIndex = answers.findIndex((answer) => answer.correct);
            form.setValue(`${quizName}.answers`, answers.map((answer, answerIndex) => {
                if (answerIndex === correctAnswersIndex) {
                    return { ...answer, correct: true }
                }
                return { ...answer, correct: false }
            }))
        }
    }, [quizType]);
    const onRadioChange = (value: string) => {
        const answers = form.getValues(`${quizName}.answers`);
        form.setValue(`${quizName}.answers`, answers.map((answer, index) => {
            if (index === Number(value)) {
                return { ...answer, correct: true }
            } return { ...answer, correct: false }
        }));
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
            <FormItem>
                <div className='flex items-center gap-x-2'>
                    <Button type='button' className='bg-green-600 hover:bg-green-500' onClick={() => appendAnswer(initAnswer)}><FilePlus2 /></Button>
                    <FormLabel className='flex items-center gap-x-2'> Answers</FormLabel>
                </div>
                {form.formState.errors.quizzes?.[quizIndex]?.answers?.root && <FormMessage>{form.formState.errors.quizzes[quizIndex].answers.root.message}</FormMessage>}
                {quizType === QuizType.MULTIPLE_CHOICE ?
                    <>
                        {answerFields.map((answer, answerIndex) => (
                            <AnswerForm key={`${quizIndex}${answerIndex}`} quizType={quizType} answerIndex={answerIndex} quizIndex={quizIndex} onDelete={() => removeAnswer(answerIndex)} form={form} />
                        ))}
                    </>
                    :
                    <RadioGroup onValueChange={(value) => onRadioChange(value)}>
                        {answerFields.map((answer, answerIndex) => (
                            <AnswerForm key={answer.id} quizType={quizType} answerIndex={answerIndex} quizIndex={quizIndex} onDelete={(() => removeAnswer(answerIndex))} form={form} />
                        ))}
                    </RadioGroup>
                }
            </FormItem>
        </div>
    )
}

export default QuizForm