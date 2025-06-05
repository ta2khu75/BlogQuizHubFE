import ButtonSubmit from "@/components/common/ButtonSubmit";
import { IMAGE_SIZES, ImageSize } from "@/components/common/RichTextEditor/plugin/nodes/ImageNode";
import SelectElement from "@/components/common/Selection";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
type Props = {
    onSubmit: (value: ImageAttributes) => void
    value?: ImageAttributes
}
export type ImageAttributes = {
    src: string;
    altText?: string;
    size: ImageSize;
    caption?: string
};
const ImageForm = ({ onSubmit, value }: Props) => {
    const form = useForm<ImageAttributes>({
        defaultValues: {
            altText: '',
            caption: '',
            size: 'medium' // Default size
        }
    })
    useEffect(() => {
        if (value) form.reset({ ...value })
    }, [value])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name='altText' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Alt text</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter alt text" {...field} />
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name='caption' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Caption</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter caption" {...field} />
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name='size' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                            <SelectElement defaultValue="medium" onChange={field.onChange} options={IMAGE_SIZES.map((size) => ({ label: size, value: size }))} />
                        </FormControl>
                    </FormItem>
                )} />
                <ButtonSubmit isSubmitting={form.formState.isSubmitting} />
            </form>
        </Form>
    )
}

export default ImageForm