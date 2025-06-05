import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AccessModifier } from '@/types/AccessModifier'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { BlogTagService } from '@/services/BlogTagService'
import QuizService from '@/services/QuizService'
// import { Combobox } from '@/components/common/Combobox'
import { BlogResponse } from '@/types/response/BlogResponse'
import RichTextEditor from '@/components/common/RichTextEditor/RichTextEditor'
import { BlogRequest, blogRequestSchema } from '@/types/request/BlogRequest'
import { Option } from '@/types/Option'
import { handleMutation } from '@/util/mutation'
import BlogFormSync from '@/components/form/BlogFormSync'
import ButtonSubmit from '@/components/common/ButtonSubmit'
import { useAppDispatch } from '@/redux/hooks'
import { BlogFormActions } from '@/redux/slice/BlogFormSlice'
import { Combobox } from '@/components/common/Combobox'
// import { BlogFormActions } from '@/redux/slice/BlogFormSlice'
type Props = {
    onSubmit: (data: BlogRequest) => void,
    blog?: BlogResponse
}

const BlogForm = ({ onSubmit, blog }: Props) => {
    const dispath = useAppDispatch()
    // const [reset, setReset] = useState(false)
    const [searchBlogTag, setSearchBlogTag] = useState("")
    const [searchQuiz, setSearchQuiz] = useState("")
    const [blogTags, setBlogTags] = useState<Option<number>[]>([])
    const [quizzes, setQuizzes] = useState<Option<string>[]>([])
    const blogDefault: BlogRequest = { title: "", content: "", quiz_ids: [0], tags: [{ id: 0, name: "" }], access_modifier: AccessModifier.PRIVATE }
    const [newTags, setNewTags] = useState<Option<number>[]>([])
    // const getBlogForm = () => {
    //     form.getValues()
    //     const blogForm = localStorage.getItem("blogForm")
    //     if (blogForm) {
    //         return JSON.parse(blogForm)
    //     } return undefined;
    // }
    // const blogForm = getBlogForm()
    // useEffect(() => {
    //     if (_.isEqual(blogForm, blogDefault) && blog) {
    //         form.reset({ ...blog, quiz_ids: blog?.quizzes?.map((quiz) => quiz.id), content: JSON.parse(blog.content) });
    //         setQuizzes(blog?.quizzes?.map((quiz) => ({ value: quiz.id, label: quiz.title })) ?? [])
    //     }
    // }, [blog])
    // useEffect(() => {
    //     if (tagFields.length === 0) {
    //         appendTag({ id: 0, name: "" }); // Nếu mảng trống, thêm phần tử mới
    //     }
    // }, [tagFields.length, appendTag]);
    // useEffect(() => {
    //     const subscription = form.watch((values) => {
    //         localStorage.setItem("blogForm", JSON.stringify(values));
    //     });
    //     return () => subscription.unsubscribe();
    // }, []);

    const form = useForm<BlogRequest>({
        resolver: zodResolver(blogRequestSchema),
        defaultValues: blogDefault,
        shouldUnregister: false
    })
    const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
        control: form.control,
        name: "tags",
    });
    const { fields: quizFields, append: appendQuiz, remove: removeQuiz } = useFieldArray({
        control: form.control,
        name: "quiz_ids",
    });
    const onReset = () => {
        dispath(BlogFormActions.reset())
        // Reset the form state in the Redux store
        // if (blog) {
        //     form.reset({ ...blog, quiz_ids: blog?.quizzes?.map((quiz) => quiz.id), content: JSON.parse(blog.content) });
        //     setQuizzes(blog?.quizzes?.map((quiz) => ({ value: quiz.id, label: quiz.title })) ?? [])
        // } else {
        //     form.reset(blogDefault)
        //     setReset(!reset)
        // }
    }
    const fetchBlogTag = async () => {
        await handleMutation(() => BlogTagService.search(searchBlogTag), (res) => {
            setBlogTags(res?.data?.map((tag) => ({
                value: tag.id,
                label: tag.name,
            })) ?? [])
        })
    }
    const fetchQuiz = async () => {
        await handleMutation(() => {
            return QuizService.readAllByKeyword(searchQuiz)
        }, (res) => {
            const quizzes = res.data.map((quiz) => ({
                value: quiz.id,
                label: quiz.title,
            }))
            setQuizzes(quizzes)
        })
    }
    useEffect(() => {
        if (searchQuiz.trim().length > 0) {
            fetchQuiz()
        }
    }, [searchQuiz])
    useEffect(() => {
        if (searchBlogTag.trim().length > 0) {
            fetchBlogTag()
        }
    }, [searchBlogTag])

    return (
        <Form {...form}>
            <FormProvider {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <BlogFormSync />
                    <FormField control={form.control} name='title' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormItem>
                        <Button type="button" className='bg-green-600 hover:bg-green-700' onClick={() => appendQuiz("")}>
                            <Plus />
                        </Button>
                        <FormLabel>Quiz</FormLabel>
                        <div className='flex flex-wrap gap-4'>
                            {quizFields.map((field, index) => (
                                <FormField
                                    key={field.id}
                                    control={form.control}
                                    name={`quiz_ids.${index}`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='flex'>
                                                <FormControl>
                                                    <Combobox options={quizzes} onInputChange={setSearchQuiz} value={{ value: field.value, label: "" }} isOptionEqual={(a, b) => a.value === b.value} onSelectChange={(value) => field.onChange(value.value)} />
                                                </FormControl>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => removeQuiz(index)}
                                                    disabled={quizFields.length === 1} // Không xóa nếu chỉ còn 1 input
                                                >
                                                    <X />
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                    <FormItem>
                        <Button type="button" className='bg-green-600 hover:bg-green-700' onClick={() => appendTag({ id: 0, name: "" })}>
                            <Plus />
                        </Button>
                        <FormLabel>Tags</FormLabel>
                        <div className='flex flex-wrap gap-4'>
                            {tagFields.map((field, index) => (
                                <FormField
                                    key={field.id}
                                    control={form.control}
                                    name={`tags.${index}`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='flex'>
                                                <FormControl>
                                                    <Combobox isOptionEqual={(a, b) => {
                                                        return a.label == b.label
                                                    }} options={[...newTags, ...blogTags]} value={{ label: field.value.name, value: field.value.id }} onInputChange={setSearchBlogTag} onSelectChange={(value) => {
                                                        console.log("select change ", value);
                                                        field.onChange({ id: value.value === 0 ? undefined : value.value, name: value.label });
                                                    }} onCreateOption={(value) => {
                                                        const newTag = { id: 0, name: value }
                                                        const newOption: Option<number> = { value: newTag.id, label: newTag.name }
                                                        setNewTags([...newTags, newOption]);
                                                        return newOption;
                                                    }} />
                                                </FormControl>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => removeTag(index)}
                                                    disabled={tagFields.length === 1} // Không xóa nếu chỉ còn 1 input
                                                >
                                                    <X />
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
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
                    <FormField control={form.control} name='content' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <RichTextEditor value={field.value} name={field.name} onChangeValue={field.onChange} />
                                {/* <TextEditor name={field.name} initialValue={field.value} className='min-h-[200px]' placeholder="Content" onChange={field.onChange} /> */}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="flex justify-between">
                        <ButtonSubmit isSubmitting={form.formState.isSubmitting} onReset={onReset} />
                    </div>
                </form>
            </FormProvider>
        </Form >
    )
}

export default BlogForm