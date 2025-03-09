import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z, ZodType } from "zod"

const formSchema: ZodType<CommentRequest> = z.object({
    content: z.string().min(3).nonempty(),
    blog_id: z.string().nonempty()
})
type Props = {
    onSubmit: (value: CommentRequest) => void
    blog_id: string
}
const CommentForm = ({ onSubmit, blog_id }: Props) => {
    const form = useForm<CommentRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: { content: "", blog_id }
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
                <FormField control={form.control} name='content' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                            <Textarea placeholder='Description' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <div className="flex justify-end">
                    {form.formState.isSubmitting ? <Button disabled>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </Button> :
                        <Button type='submit'>Submit</Button>}
                </div>
            </form>
        </Form>
    )
}

export default CommentForm 