import TextEditor from '@/components/elements/util/TextEditor/TextEditor'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AccessModifier } from '@/types/AccessModifier'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'
const formSchema: ZodType<BlogRequest> = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
    blog_tags: z.string().array().min(1).max(5),
    access_modifier: z.nativeEnum(AccessModifier),
    exam_ids: z.string().array().optional()
})
type Props = {
    onSubmit: (data: BlogRequest) => void
}
const BlogForm = ({ onSubmit }: Props) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { title: "", content: "", blog_tags: [], access_modifier: AccessModifier.PRIVATE }
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField control={form.control} name='title' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
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
                        <TextEditor name={field.name} className='min-h-[200px]' placeholder="Content" onChange={field.onChange} initialValue={[{ type: 'paragraph', children: [{ text: '' }] }]} />
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