import Modal from '@/components/elements/util/Modal';
import QuizForm, { quizSchema } from '@/components/form/QuizForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { AccessModifier } from '@/types/AccessModifier';
import { ExamLevel } from '@/types/ExamLevel';
import { ExamStatus } from '@/types/ExamStatus';
import { QuizType } from '@/types/QuizType';
import { zodResolver } from '@hookform/resolvers/zod';
import { FolderX, Loader2, FolderPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod'
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const examSchema = z.object({
    title: z.string().min(3).nonempty(),
    exam_level: z.nativeEnum(ExamLevel),
    exam_status: z.nativeEnum(ExamStatus),
    duration: z.number().min(5),
    description: z.string(),
    access_modifier: z.nativeEnum(AccessModifier),
    exam_category_id: z.number(),
    quizzes: z.array(quizSchema).nonempty()
})
type Props = {
    examCategories: ExamCategoryResponse[]
}
const ExamForm = ({ examCategories }: Props) => {
    const [open, setOpen] = useState(false)
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    const form = useForm<ExamRequest>({
        resolver: zodResolver(examSchema),
        defaultValues: { title: "", exam_level: ExamLevel, exam_status: ExamStatus, duration: 0, exam_category_id: 0, access_modifier: AccessModifier.PRIVATE, description: "", quizzes: [{ answers: [{ answer: "", correct: false }, { answer: "", correct: false }, { answer: "", correct: false }], question: "", quiz_type: QuizType.SINGLE_CHOICE }] }
    })
    const { fields: quizFields, append: appendQuiz, remove: removeQuiz } = useFieldArray({
        control: form.control,
        name: "quizzes",
    });
    const onSubmit = (value: ExamRequest) => {
        console.log(value);
        setOpen(false)
    }
    const onAddQuiz = () => {
        appendQuiz({ question: "", quiz_type: QuizType.SINGLE_CHOICE, answers: [{ answer: "", correct: false }, { answer: "", correct: false }, { answer: "", correct: false }] })
        setCurrent(form.getValues("quizzes").length)
        setCount(form.getValues("quizzes").length)
    }
    const onRemoveQuiz = (index: number) => {
        removeQuiz(index)
        // setCurrent(form.getValues("quizzes").length)
        setCount(form.getValues("quizzes").length)
    }
    const onCancel = () => {
        setOpen(false)
    }
    console.log(form.getValues());

    return (
        <Form {...form}>
            <form className='w-[100vh' onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex justify-between'>
                    <Button type='button' className='bg-green-600 hover:bg-green-500' onClick={onAddQuiz}><FolderPlus /></Button>
                    <div className="py-2 text-center text-sm text-muted-foreground">
                        Slide {current} of {count}
                    </div>
                    <Button type='button' className='bg-blue-600 hover:bg-blue-500' onClick={() => setOpen(true)}>Create</Button>
                </div>
                <Modal onCancel={onCancel} open={open} title='Create Exam'>
                    <FormField control={form.control} name='title' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='exam_category_id' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Exam category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={`${field.value}`}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {examCategories.map(examCategory => (
                                        <SelectItem key={examCategory.id} value={`${examCategory.id}`}>{examCategory.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        // <FormItem>
                        //     <FormLabel>Title</FormLabel>
                        //     <FormControl>
                        //         <Input type='text' placeholder="Title" {...field} />
                        //     </FormControl>
                        //     <FormMessage />
                        // </FormItem>
                    )} />
                    <FormField
                        control={form.control}
                        name="exam_level"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Level</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex space-y-1"
                                    >
                                        {Object.entries(ExamLevel).map((item) => (
                                            <FormItem key={item[0]} className="flex items-center space-x-3 space-y-0">
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
                    <FormField
                        control={form.control}
                        name="exam_status"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Exam title</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex space-y-1"
                                    >
                                        {Object.entries(ExamStatus).map((item) => (
                                            <FormItem key={item[1]} className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value={item[1]} />
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
                    <FormField control={form.control} name='duration' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder="Duration" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='description' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="flex justify-end">
                        {form.formState.isSubmitting ? <Button disabled>
                            <Loader2 className="animate-spin" />
                            Please wait
                        </Button> :
                            <Label htmlFor='submit' className='cursor-pointer p-4 bg-blue-600 hover:bg-blue-500 border rounded text-white'>submit</Label>}
                    </div>
                </Modal>
                <Button className='hidden' id='submit' type='submit'>Submit</Button>
                <Carousel setApi={setApi} >
                    <CarouselContent className='w-[100vh]'>
                        {
                            quizFields.map((quiz, quizIndex) => (
                                <CarouselItem key={quizIndex}>
                                    <Card className='w-[100vh]'>
                                        <CardHeader>
                                            <div className='flex justify-between'>
                                                <CardTitle>Quiz {quizIndex + 1}</CardTitle>
                                                <Button variant={'destructive'} type='button' onClick={() => onRemoveQuiz(quizIndex)}><FolderX /></Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex justify-center">
                                            <QuizForm quizIndex={quizIndex} form={form} />
                                        </CardContent>
                                    </Card>
                                </CarouselItem >
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious type='button' />
                    <CarouselNext type='button' />
                </Carousel>
            </form>
        </Form >
    )
}

export default ExamForm