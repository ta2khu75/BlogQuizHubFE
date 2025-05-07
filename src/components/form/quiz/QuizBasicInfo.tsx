import ButtonSubmit from "@/components/common/ButtonSubmit";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AccessModifier } from "@/types/AccessModifier";
import { QuizResultMode } from "@/types/DisplayMode";
import { QuizLevel } from "@/types/QuizLevel";
import { QuizRequest } from "@/types/request/QuizRequest";
import { useFormContext } from "react-hook-form";
type Props = {
    quizCategories: QuizCategoryResponse[]
}
const QuizBasicInfo = ({ quizCategories }: Props) => {
    const { control, formState, reset } = useFormContext<QuizRequest>()
    const onReset = () => {
        reset({})
    }
    return (
        <>
            <FormField control={control} name='title' render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input type='text' placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            {/* <FormField control={control} name='blog_id' render={({ field }) => (
                <FormItem>
                    <FormLabel>Blog</FormLabel>
                    <div className='flex items-center gap-2'>
                        <Input value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Select onValueChange={(value) => field.onChange(value)} defaultValue={`${field.value}`}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select blog" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {blogs.map(blog => (
                                    <SelectItem key={blog.id} value={`${blog.id}`}>{blog.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </FormItem>
            )} /> */}
            <FormField control={control} name='category_id' render={({ field }) => (
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
                control={control}
                name="level"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>Level</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex space-y-1"
                            >
                                {Object.values(QuizLevel).map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={item} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {item}
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
                control={control}
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
                                {Object.values(QuizResultMode).map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={item} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {item}
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
                control={control}
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
                                {Object.values(AccessModifier).map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={item} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {item}
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
                    control={control}
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
                    control={control}
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
            <FormField control={control} name='duration' render={({ field }) => (
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
            <FormField control={control} name='description' render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder='Description' {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <ButtonSubmit onReset={onReset} isSubmitting={formState.isSubmitting} />
            {/* <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                    <Input type='file' accept='image/*' name='image' placeholder='Image' required
                        onChange={onChangeImage}
                    />
                </FormControl>
                {image?.error && <FormMessage />}
            </FormItem> */}
        </>
    )
}

export default QuizBasicInfo