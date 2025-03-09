import TextEditor from '@/components/elements/util/TextEditor/TextEditor'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AccessModifier } from '@/types/AccessModifier'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'
const formSchema: ZodType<BlogRequest> = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
    blog_tags: z.array(z.string().nonempty()).min(1),
    access_modifier: z.nativeEnum(AccessModifier),
    exam_ids: z.string().array().optional()
})
type FormData = z.infer<typeof formSchema>;
type Props = {
    onSubmit: (data: BlogRequest) => void,
    blog?: BlogDetailsResponse
}

const BlogForm = ({ onSubmit, blog }: Props) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { title: "", content: "", blog_tags: [""], access_modifier: AccessModifier.PRIVATE },
        shouldUnregister: false
    })
    const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray<FormData>({
        control: form.control,
        name: "blog_tags",
    });

    useEffect(() => {
        if (!blog) return
        console.log(blog);

        form.reset({ ...blog })
    }, [blog, form])
    useEffect(() => {
        if (tagFields.length === 0) {
            appendTag(""); // Nếu mản
            // g trống, thêm phần tử mới
        }
    }, [tagFields.length]);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                    <Button type="button" className='bg-green-600 hover:bg-green-700' onClick={() => appendTag("")}>
                        <Plus />
                    </Button>
                    <FormLabel>Tags</FormLabel>
                    <div className='flex flex-wrap gap-4'>
                        {tagFields.map((field, index) => (
                            <FormField
                                key={field.id}
                                control={form.control}
                                name={`blog_tags.${index}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex'>
                                            <FormControl>
                                                <Input {...field} placeholder="Nhập tag..." />
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
                {/* )} /> */}
                <FormField
                    control={form.control}
                    name="access_modifier"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Access modifier</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
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
                            <TextEditor name={field.name} initialValue={field.value} className='min-h-[200px]' placeholder="Content" onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <div className="flex justify-end">
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