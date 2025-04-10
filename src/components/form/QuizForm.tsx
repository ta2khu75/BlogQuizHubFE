import Modal from '@/components/elements/util/Modal';
import _ from "lodash";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { AccessModifier } from '@/types/AccessModifier';
import { zodResolver } from '@hookform/resolvers/zod';
import { FolderX, Loader2, FolderPlus } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod'
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Carousel from '@/components/elements/util/Carousel';
import { useToast } from '@/hooks/use-toast';
import FunctionUtil from '@/util/FunctionUtil';
import Confirm from '@/components/elements/util/Confirm';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { QuizLevel } from '@/types/QuizLevel';
import { QuestionType } from '@/types/QuestionType';
import QuizService from '@/services/QuizService';
import QuestionForm, { questionSchema } from '@/components/form/QuestionForm';
import QuizMenuElement from '@/components/elements/content/quiz/QuizMenuElement';
import { QuizResultMode } from '@/types/DisplayMode';
const quizSchema = z.object({
    title: z.string().nonempty(),
    quiz_level: z.nativeEnum(QuizLevel),
    duration: z.number().min(5),
    description: z.string().optional(),
    access_modifier: z.nativeEnum(AccessModifier),
    quiz_category_id: z.number(),
    quiz_result_mode: z.nativeEnum(QuizResultMode),
    shuffle_question: z.boolean().default(true),
    completed: z.boolean().default(false),
    questions: z.array(questionSchema),
})
type quizSchema = z.infer<typeof quizSchema>;
type Props = {
    quizCategories: QuizCategoryResponse[],
    quiz?: QuizResponse
}
const QuizForm = ({ quizCategories, quiz }: Props) => {
    const getQuizForm = () => {
        const quizForm = localStorage.getItem("quizForm")
        if (quizForm) {
            return JSON.parse(quizForm)
        } return undefined;
    }
    const quizForm: QuizRequest = getQuizForm()
    const { toast } = useToast()
    const router = useRouter()
    const [image, setImage] = useState<{ value: File, error: boolean }>()
    const [open, setOpen] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [current, setCurrent] = useState(0)
    const initQuiz: QuestionRequest = { question: "", question_type: QuestionType.SINGLE_CHOICE, shuffle_answer: false, answers: Array(4).fill({ answer: "", correct: false }) };
    const quizDefault: QuizRequest = { title: "", quiz_level: QuizLevel.EASY, completed: false, shuffle_question: true, duration: 0, quiz_category_id: 0, access_modifier: AccessModifier.PRIVATE, quiz_result_mode: QuizResultMode.ANSWER_VISIBLE, description: "", questions: [initQuiz] }

    const form = useForm<QuizRequest>({
        resolver: zodResolver(quizSchema),
        defaultValues: quizForm ?? quizDefault,
    })
    const { fields: questionFields, append: appendQuiz, remove: removeQuiz } = useFieldArray({
        control: form.control,
        name: "questions",
    });
    const questionErrors = useMemo(() => {
        return form.formState.errors?.questions ?? [];
    }, [form.formState.errors?.questions]);
    const hasQuizError = useMemo(() => {
        return (questionErrors.length ?? 0) > 0;
    }, [questionErrors.length])
    const [showQuestionError, setShowQuestionError] = useState(false)
    useEffect(() => {
        if ((questionErrors.length ?? 0) > 0) {
            setOpen(false)
            setShowQuestionError(true)
        }
    }
        , [questionErrors.length])
    const count = Math.max(questionFields.length - 1, 0)
    useEffect(() => {
        const subscription = form.watch((values) => {
            localStorage.setItem("quizForm", JSON.stringify(values));
        });
        return () => subscription.unsubscribe();
    }, [form]);
    useEffect(() => {
        if (_.isEqual(quizForm, quizDefault) && quiz) {
            form.reset({ ...quiz, quiz_category_id: quiz?.quiz_category?.id })
        }
    }, [quiz])

    useEffect(() => {
        if (Array.isArray(questionErrors)) {
            const index = questionErrors.findIndex(error => error !== undefined)
            if (index !== -1) setCurrent(index)
        }
    }, [questionErrors])
    const slideState = useMemo(() => {
        return questionFields.map((item, index) => {
            if (index === current && questionErrors[index]) return "warning";
            if (index === current) return "selected";
            if (questionErrors[index]) return "error";
            return "unselected";
        })
    }, [questionErrors, current, questionFields]);
    const onSubmit = async (value: QuizRequest) => {
        if (quiz) {
            try {
                const res = await QuizService.update(quiz.info.id, value, image?.value);
                if (res.success) {
                    setOpen(false)
                    toast({ title: "Update success" })
                    router.push(`/profile?id=${res.data.author.info.id}&tab=quiz`)
                } else {
                    toast({ title: "Update failed", description: FunctionUtil.showError(res.message_error), variant: "destructive" });
                }
            } catch (error) {
                toast({ title: "Update failed", description: FunctionUtil.showError(error), variant: "destructive" });
            }
        } else if (image?.value) {
            try {
                const res = await QuizService.create(value, image.value);
                if (res.success) {
                    setOpen(false)
                    toast({ title: "Create success" })
                    router.push(`/profile?id=${res.data.author.info.id}&tab=quiz`)
                } else {
                    toast({ title: "Create failed", description: FunctionUtil.showError(res.message_error), variant: "destructive" });
                }
            } catch (error) {
                toast({ title: "Create failed", description: FunctionUtil.showError(error), variant: "destructive" });
            }
        } else {
            setImage({ value: new File([], ""), error: true })
        }
    }
    const onAddQuiz = () => {
        appendQuiz(initQuiz)
        setCurrent((prev) => Math.max(count + 1, prev + 1))
    }
    const onRemoveQuiz = () => {
        if (count === 0) return
        removeQuiz(current)
        setCurrent((prev) => Math.max(prev - 1, 0))
    }
    const onSelectedSlide = (index: number) => {
        setCurrent(index)
    }
    const onCancel = () => {
        setOpen(false)
    }
    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setImage({ value: e.target.files?.[0], error: false })
    }
    const onReset = () => {
        if (quiz) {
            form.reset({ ...quiz, quiz_category_id: quiz?.quiz_category?.id })
            setCurrent(0)
        } else {
            form.reset(quizDefault)
            setCurrent(0)
        }
    }
    return (
        <>
            <Form {...form}>
                <form className='w-[100vh]' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex justify-between'>
                        <Button variant={'destructive'} type='button' onClick={() => onReset()}>Reset</Button>
                        <div className="py-2 text-center text-sm text-muted-foreground">
                            Slide {current + 1} of {count + 1}
                        </div>
                        <Button disabled={hasQuizError} variant={hasQuizError ? "secondary" : "default"} type='button' className='bg-blue-600 hover:bg-blue-500' onClick={() => setOpen(true)}>{quiz ? "Update" : " Create"}</Button>
                    </div>
                    <Modal scroll className='max-w-[800px]' onCancel={onCancel} open={open && questionErrors.length === 0} title={quiz ? "Update Quiz" : "Create Quiz"}>
                        <FormField control={form.control} name='title' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder="Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='quiz_category_id' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quiz category</FormLabel>
                                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={`${field.value}`}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {quizCategories.map(quizCategory => (
                                            <SelectItem key={quizCategory.id} value={`${quizCategory.id}`}>{quizCategory.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField
                            control={form.control}
                            name="quiz_level"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Level</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex space-y-1"
                                        >
                                            {Object.entries(QuizLevel).map((item) => (
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
                        <div className='grid grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name="completed"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>Completed</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="shuffle_question"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>Shuffle question</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="quiz_result_mode"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Quiz result mode</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex space-y-1"
                                        >
                                            {Object.entries(QuizResultMode).map((item) => (
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
                            name="access_modifier"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Access modifier</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex space-y-1"
                                        >
                                            {Object.entries(AccessModifier).map((item) => (
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
                        <FormField control={form.control} name='duration' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                    <Input type='number' min={5} placeholder="Duration"
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='description' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Description' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input type='file' accept='image/*' name='image' placeholder='Image' required
                                    onChange={onChangeImage}
                                />
                            </FormControl>
                            {image?.error && <FormMessage />}
                        </FormItem>
                        <div className="flex justify-end">
                            {form.formState.isSubmitting ? <Button disabled>
                                <Loader2 className="animate-spin" />
                                Please wait
                            </Button> :
                                <Label htmlFor='submit' className='cursor-pointer p-4 bg-blue-600 hover:bg-blue-500 border rounded text-white'>submit</Label>}
                        </div>
                    </Modal>
                    <Button className='hidden' id='submit' type='submit'>Submit</Button>
                    <Carousel count={count} current={current} className='max-w-[100vh]' onNextSlide={() => setCurrent(current + 1)} onPrevSlide={() => setCurrent(current - 1)} >
                        <>
                            {
                                questionFields.map((question, questionIndex: number) => (
                                    <div key={question.id}>
                                        <Card className='w-[100vh] p-10'>
                                            <CardHeader>
                                                <div className='flex justify-between'>
                                                    <Button type='button' className='bg-green-600 hover:bg-green-500' onClick={onAddQuiz}><FolderPlus /></Button>
                                                    <CardTitle>Question {questionIndex + 1}</CardTitle>
                                                    <Button variant={'destructive'} disabled={count === 0 ? true : false} type='button' onClick={() => setOpenConfirm(true)}><FolderX /></Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="flex justify-center">
                                                <QuestionForm questionIndex={questionIndex} form={form} />
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))
                            }
                        </>
                    </Carousel>
                </form>
            </Form >
            <Confirm onCancel={() => setOpenConfirm(false)} open={openConfirm} onContinue={() => onRemoveQuiz()} title='Do you want to delete this question?' />
            <QuizMenuElement onIndexClick={onSelectedSlide} states={slideState} />
            <Confirm open={showQuestionError} onCancel={() => setShowQuestionError(false)} title='Questions have errors, you must fix them before submit' />
        </>
    )
}

export default QuizForm