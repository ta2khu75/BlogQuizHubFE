import _ from 'lodash'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AccessModifier } from '@/types/AccessModifier'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import useDebounce from '@/hooks/useDebounce'
import { BlogTagService } from '@/services/BlogTagService'
import QuizService from '@/services/QuizService'
import { Combobox } from '@/components/common/Combobox'
import { BlogResponse } from '@/types/response/BlogResponse'
import RichTextEditor from '@/components/common/RichTextEditor/RichTextEditor'
import { BlogRequest, blogRequestSchema } from '@/types/request/BlogRequest'
import { Option } from '@/types/Option'
import { handleMutation } from '@/util/mutation'
import FormSyncToRedux from '@/components/form/BlogFormChange'
type Props = {
    onSubmit: (data: BlogRequest) => void,
    blog?: BlogResponse
}

const BlogForm = ({ onSubmit, blog }: Props) => {
    const [reset, setReset] = useState(false)
    const [searchBlogTag, setSearchBlogTag] = useState("")
    const [searchQuiz, setSearchQuiz] = useState("")
    const [blogTags, setBlogTags] = useState<Option[]>([])
    const [quizzes, setQuizzes] = useState<Option[]>([])
    const debounceBlogTag = useDebounce(searchBlogTag, 500)
    const debounceQuiz = useDebounce(searchQuiz, 500)
    const blogDefault = { title: "", content: {}, quiz_ids: [], blog_tags: [{ id: 0, name: "" }], access_modifier: AccessModifier.PRIVATE }
    // const getBlogForm = () => {
    //     form.getValues()
    //     const blogForm = localStorage.getItem("blogForm")
    //     if (blogForm) {
    //         return JSON.parse(blogForm)
    //     } return undefined;
    // }
    // const blogForm = getBlogForm()
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
    // useEffect(() => {
    //     if (_.isEqual(blogForm, blogDefault) && blog) {
    //         form.reset({ ...blog, quiz_ids: blog?.quizzes?.map((quiz) => quiz.id), content: JSON.parse(blog.content) });
    //         setQuizzes(blog?.quizzes?.map((quiz) => ({ value: quiz.id, label: quiz.title })) ?? [])
    //     }
    // }, [blog])
    useEffect(() => {
        if (tagFields.length === 0) {
            appendTag({ id: 0, name: "" }); // Nếu mảng trống, thêm phần tử mới
        }
    }, [tagFields.length, appendTag]);
    useEffect(() => {
        const subscription = form.watch((values) => {
            localStorage.setItem("blogForm", JSON.stringify(values));
        });
        return () => subscription.unsubscribe();
    }, []);

    const onReset = () => {
        if (blog) {
            form.reset({ ...blog, quiz_ids: blog?.quizzes?.map((quiz) => quiz.id), content: JSON.parse(blog.content) });
            setQuizzes(blog?.quizzes?.map((quiz) => ({ value: quiz.id, label: quiz.title })) ?? [])
        } else {
            form.reset(blogDefault)
            setReset(!reset)
        }
    }
    const fetchBlogTag = async () => {
        await handleMutation(() => BlogTagService.search(debounceBlogTag), (res) => {
            setBlogTags(res?.data?.map((tag) => ({
                value: tag.name,
                label: tag.name,
            })) ?? [])
        })
    }
    const fetchQuiz = async () => {
        await handleMutation(() => {
            return QuizService.readAllByKeyword(debounceQuiz)
        }, (res) => {
            const quizzes = res.data.map((quiz) => ({
                value: quiz.info.id,
                label: quiz.title,
            }))
            setQuizzes(quizzes)
        })
    }
    useEffect(() => {
        if (debounceQuiz.trim().length > 0) {
            fetchQuiz()
        }
    }, [debounceQuiz])
    useEffect(() => {
        if (debounceBlogTag.trim().length > 0) {
            fetchBlogTag()
        }
    }, [debounceBlogTag])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormSyncToRedux />
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
                                                <Combobox options={quizzes} value={field.value} onSelectChange={(value) => { field.onChange(value); setSearchQuiz("") }} onInputChange={setSearchQuiz} />
                                            </FormControl>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => removeQuiz(index)}
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
                                                <Combobox options={blogTags} value={field.value.id} onSelectChange={(value) => { field.onChange(value); setSearchBlogTag("") }} onInputChange={setSearchBlogTag} />
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
                            <RichTextEditor value={field.value} name={field.name} onChange={field.onChange} />
                            {/* <TextEditor name={field.name} initialValue={field.value} className='min-h-[200px]' placeholder="Content" onChange={field.onChange} /> */}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <div className="flex justify-between">
                    <Button type='button' onClick={onReset}>Reset</Button>

                    {form.formState.isSubmitting ?
                        <Button disabled>
                            <Loader2 className="animate-spin" />
                            Please wait
                        </Button>
                        :
                        <Button type='submit'>Submit</Button>
                    }
                </div>
            </form>
        </Form>
    )
}

export default BlogForm