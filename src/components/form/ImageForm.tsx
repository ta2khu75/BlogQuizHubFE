import ButtonSubmit from "@/components/common/ButtonSubmit";
import SelectElement from "@/components/common/SelectElement";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
type Props = {
    onSubmit: (value: ImageAttributes) => void
}
type ImageAttributes = {
    src: string;
    altText: string;
    position: string;
    caption?: string
};
const ImageForm = ({ onSubmit }: Props) => {
    const form = useForm<ImageAttributes>()
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
                <FormField control={form.control} name='position' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                            <SelectElement defaultValue="left" onChange={field.onChange} options={[{ label: "Left", value: "left" }, { label: "Right", value: "right" }, { label: "Center", value: "center" }]} />
                        </FormControl>
                    </FormItem>
                )} />
                <ButtonSubmit isSubmitting={form.formState.isSubmitting} />
            </form>
        </Form>
    )
}

export default ImageForm