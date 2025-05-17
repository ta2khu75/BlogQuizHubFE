import AnswerForm from '@/components/form/quiz/AnswerForm'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup } from '@/components/ui/radio-group'
import { AnswerDto } from '@/types/dto/AnswerDto'
import { QuestionType } from '@/types/QuestionType'
import { QuizRequest } from '@/types/request/QuizRequest'
import { CheckedState } from '@radix-ui/react-checkbox'
import { FilePlus2 } from 'lucide-react'
import React, { useCallback, useEffect } from 'react'
import { ControllerRenderProps, useFieldArray, useFormContext } from 'react-hook-form'
type Props = {
    name: `questions.${number}`
}
const AnswerList = ({ name }: Props) => {
    const form = useFormContext<QuizRequest>()
    const questionType = form.watch(`${name}.type`)
    const defaultAnswer: AnswerDto = { content: "", correct: false }
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `${name}.answers`
    });
    useEffect(() => {
        if (questionType === QuestionType.SINGLE_CHOICE) {
            const answers = form.getValues(`${name}.answers`);
            const correctIndex = answers.findIndex((a) => a.correct);
            const updatedAnswers = answers.map((answer, index) => ({
                ...answer,
                correct: index === correctIndex
            }));

            // So sánh trước khi set lại (tránh re-render vô ích)
            const hasChanged = updatedAnswers.some((a, i) => a.correct !== answers[i].correct);
            if (hasChanged) {
                form.setValue(`${name}.answers`, updatedAnswers);
            }
        }
    }, [questionType]);
    const onRadioChange = (field: ControllerRenderProps<QuizRequest, `questions.${number}.answers`>, value: string) => {
        const selectedIndex = Number(value);
        const answers = form.getValues(field.name);
        const updatedAnswers = answers.map((answer, index) => ({
            ...answer,
            correct: index === selectedIndex
        }));
        const hasChanged = updatedAnswers.some((a, i) => a.correct !== answers[i].correct);
        if (hasChanged) {
            field.onChange(updatedAnswers)
        }
    }
    const onCheckboxChange = useCallback((field: ControllerRenderProps<QuizRequest, `questions.${number}.answers`>, checked: CheckedState, answerIndex: number) => {
        const answers = form.getValues(field.name);
        if (checked) {
            field.onChange(answers?.map((item, index) => index === answerIndex ? { ...item, correct: true } : item))
        } else {
            field.onChange(
                answers.map((item, index) =>
                    index == answerIndex ? { ...item, correct: false } : item
                )
            )
        }
    }, [form])
    const appendAnswer = (answer: AnswerDto) => {
        append(answer)
    }
    const removeAnswer = (index: number) => {
        remove(index)
    }
    return (
        <FormField
            control={form.control}
            name={`${name}.answers`}
            render={({ field, fieldState }) => (
                <FormItem>
                    <div className='flex items-center gap-x-2'>
                        <Button type='button' className='bg-green-600 hover:bg-green-500' onClick={() => appendAnswer(defaultAnswer)}><FilePlus2 /></Button>
                        <FormLabel className='flex items-center gap-x-2'> Answers</FormLabel>
                    </div>
                    {questionType === QuestionType.SINGLE_CHOICE ?
                        <RadioGroup className='flex flex-col gap-y-4' onValueChange={(value) => onRadioChange(field, value)}>
                            {
                                fields.map((answer, answerIndex) => (
                                    <AnswerForm
                                        questionName={name}
                                        onCheckboxChange={(value) => onCheckboxChange(field, value, answerIndex)}
                                        key={answer.id}
                                        checked={field.value?.[answerIndex]?.correct ?? false}
                                        name={`${name}.answers.${answerIndex}`}
                                        questionType={questionType}
                                        answerIndex={answerIndex}
                                        onDelete={() => removeAnswer(answerIndex)}
                                    />
                                ))
                            }
                        </RadioGroup>
                        :
                        <div className='flex flex-col gap-y-4'>
                            {fields.map((answer, index) =>
                                <AnswerForm
                                    questionName={name}
                                    onCheckboxChange={(value) => onCheckboxChange(field, value, index)}
                                    key={answer.id}
                                    checked={field.value?.[index]?.correct ?? false}
                                    name={`${name}.answers.${index}`}
                                    questionType={questionType}
                                    answerIndex={index}
                                    onDelete={() => removeAnswer(index)}
                                />
                            )}
                        </div>
                    }
                    <p className='text-destructive'>{fieldState.error?.root?.message}</p>
                </FormItem>
            )} />
    )
}

export default AnswerList