import AnswerForm from '@/components/form/AnswerForm'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QuestionType } from '@/types/QuestionType'
import React, { useEffect } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { FilePlus2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch'
import { QuizRequest } from '@/types/request/QuizRequest'
import { AnswerDto } from '@/types/dto/AnswerDto'
type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<QuizRequest, any, undefined>
    questionIndex: number
}
const QuestionForm = ({ form, questionIndex }: Props) => {
    const questionName: `questions.${number}` = `questions.${questionIndex}`;
    const questionType = form.watch(`${questionName}.type`)
    const initAnswer: AnswerDto = { content: "", correct: false }
    const { fields: answerFields, append: appendAnswer, remove: removeAnswer } = useFieldArray({
        control: form.control,
        name: `${questionName}.answers`,
        rules: { minLength: 2 },
    });
    useEffect(() => {
        if (questionType === QuestionType.SINGLE_CHOICE) {
            const answers = form.getValues(`${questionName}.answers`);
            const correctAnswersIndex = answers.findIndex((answer) => answer.correct);
            form.setValue(`${questionName}.answers`, answers.map((answer, answerIndex) => {
                if (answerIndex === correctAnswersIndex) {
                    return { ...answer, correct: true }
                }
                return { ...answer, correct: false }
            }))
        }
    }, [questionType]);
    const onRadioChange = (value: string) => {
        const answers = form.getValues(`${questionName}.answers`);
        form.setValue(`${questionName}.answers`, answers.map((answer, index) => {
            if (index === Number(value)) {
                return { ...answer, correct: true }
            } return { ...answer, correct: false }
        }));
    }
    return (
        <div className='w-full flex flex-col gap-4'>
            <FormField control={form.control} name={`${questionName}.content`} render={({ field }) => (
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
                name={`${questionName}.type`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Question type</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-y-1"
                            >
                                {Object.values(QuestionType).map((item, index) => (
                                    <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={item} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {item}
                                        </FormLabel>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`${questionName}.shuffle_answer`}
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel>Shuffle answer</FormLabel>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormItem>
                <div className='flex items-center gap-x-2'>
                    <Button type='button' className='bg-green-600 hover:bg-green-500' onClick={() => appendAnswer(initAnswer)}><FilePlus2 /></Button>
                    <FormLabel className='flex items-center gap-x-2'> Answers</FormLabel>
                </div>
                {form.formState.errors.questions?.[questionIndex]?.answers?.root && <FormMessage>{form.formState.errors.questions[questionIndex].answers.root.message}</FormMessage>}
                {questionType === QuestionType.MULTIPLE_CHOICE ?
                    <>
                        {answerFields.map((answer, answerIndex) => (
                            <AnswerForm key={`${questionIndex}${answerIndex}`} questionType={questionType} answerIndex={answerIndex} questionIndex={questionIndex} onDelete={() => removeAnswer(answerIndex)} form={form} />
                        ))}
                    </>
                    :
                    <RadioGroup onValueChange={(value) => onRadioChange(value)}>
                        {answerFields.map((answer, answerIndex) => (
                            <AnswerForm key={answer.id} questionType={questionType} answerIndex={answerIndex} questionIndex={questionIndex} onDelete={(() => removeAnswer(answerIndex))} form={form} />
                        ))}
                    </RadioGroup>
                }
            </FormItem>
        </div>
    )
}

export default QuestionForm