import ButtonSubmit from "@/components/common/ButtonSubmit";
import { Combobox, ComboboxOption } from "@/components/common/Combobox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useDebounce from "@/hooks/useDebounce";
import { BlogService } from "@/services/BlogService";
import { AccessModifier } from "@/types/AccessModifier";
import { QuizResultMode } from "@/types/DisplayMode";
import { QuizLevel } from "@/types/QuizLevel";
import { QuizRequest } from "@/types/request/QuizRequest";
import { handleMutation } from "@/util/mutation";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
type Props = {
    quizCategories: QuizCategoryResponse[],
    onReset: () => void
}
const QuizBasicInfo = ({ quizCategories }: Props) => {
    const { control, formState, reset, getValues } = useFormContext<QuizRequest>();
    const [keywordBlog, setKeywordBlog] = useState("");
    const [blogOptions, setBlogOptions] = useState<ComboboxOption[]>([]);
    const searchBlog = useDebounce(keywordBlog);
    const [image, setImage] = useState<{ value: File; error: boolean }>();

    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setImage({ value: e.target.files[0], error: false });
    };

    const onReset = () => {
        const values = getValues();
        reset({ questions: values.questions });
    };

    const fetchSearchBlog = useCallback((titleBlog: string) => {
        handleMutation(() => BlogService.search({ keyword: titleBlog }), (res) =>
            setBlogOptions(
                res.data?.content?.map((blog) => ({ label: blog.name, value: blog.id })) ?? []
            )
        );
    }, []);

    useEffect(() => {
        fetchSearchBlog(searchBlog);
    }, [searchBlog, fetchSearchBlog]);

    return (
        <div className="grid gap-6 p-6 rounded-2xl bg-white shadow-sm md:p-8">
            <FormField
                control={control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Title" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="blog_id"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Blog</FormLabel>
                        <FormControl>
                            <Combobox
                                array={blogOptions}
                                value={field.value}
                                onSelectChange={(value) => {
                                    field.onChange(value);
                                    setKeywordBlog("");
                                }}
                                onInputChange={setKeywordBlog}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="category_id"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Quiz category</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={`${field.value}`}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {quizCategories.map((quizCategory) => (
                                    <SelectItem key={quizCategory.id} value={`${quizCategory.id}`}>
                                        {quizCategory.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={control}
                    name="level"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Level</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-2">
                                    {Object.values(QuizLevel).map((item) => (
                                        <FormItem key={item} className="flex items-center space-x-3">
                                            <FormControl>
                                                <RadioGroupItem value={item} />
                                            </FormControl>
                                            <FormLabel className="font-normal">{item}</FormLabel>
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
                        <FormItem>
                            <FormLabel>Quiz result mode</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-2">
                                    {Object.values(QuizResultMode).map((item) => (
                                        <FormItem key={item} className="flex items-center space-x-3">
                                            <FormControl>
                                                <RadioGroupItem value={item} />
                                            </FormControl>
                                            <FormLabel className="font-normal">{item}</FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={control}
                name="access_modifier"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Access modifier</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-2">
                                {Object.values(AccessModifier).map((item) => (
                                    <FormItem key={item} className="flex items-center space-x-3">
                                        <FormControl>
                                            <RadioGroupItem value={item} />
                                        </FormControl>
                                        <FormLabel className="font-normal">{item}</FormLabel>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                    control={control}
                    name="completed"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Completed</FormLabel>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="shuffle_question"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Shuffle question</FormLabel>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={control}
                name="duration"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                min={5}
                                placeholder="Duration"
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                    <Input type="file" accept="image/*" name="image" placeholder="Image" onChange={onChangeImage} />
                </FormControl>
                {image?.error && <FormMessage />}
            </FormItem>

            <ButtonSubmit onReset={onReset} isSubmitting={formState.isSubmitting} />
        </div>
    );
};

// const QuizBasicInfo = ({ quizCategories }: Props) => {
//     const { control, formState, reset, getValues } = useFormContext<QuizRequest>()
//     const [keywordBlog, setKeywordBlog] = useState("")
//     const [blogOptions, setBlogOptions] = useState<ComboboxOption[]>([])
//     const searchBlog = useDebounce(keywordBlog)
//     const [image, setImage] = useState<{ value: File, error: boolean }>()
//     const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) setImage({ value: e.target.files?.[0], error: false })
//     }
//     const onReset = () => {
//         const values = getValues()
//         reset({ questions: values.questions })
//     }
//     const fetchSearchBlog = useCallback((titleBlog: string) => {
//         handleMutation(() => BlogService.search({ keyword: titleBlog }), (res) =>
//             setBlogOptions(res.data?.content?.map((blog) => ({ label: blog.name, value: blog.id })) ?? []))
//     }, [])
//     useEffect(() => {
//         fetchSearchBlog(searchBlog)
//     }, [searchBlog, fetchSearchBlog])
//     return (
//         <>
//             <FormField control={control} name='title' render={({ field }) => (
//                 <FormItem>
//                     <FormLabel>Title</FormLabel>
//                     <FormControl>
//                         <Input type='text' placeholder="Title" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                 </FormItem>
//             )} />
//             <FormField control={control} name='blog_id' render={({ field }) => (
//                 <FormItem>
//                     <FormLabel>Blog</FormLabel>
//                     <FormItem>
//                         <FormControl>
//                             <Combobox array={blogOptions} value={field.value} onSelectChange={(value) => { field.onChange(value); setKeywordBlog("") }} onInputChange={setKeywordBlog} />
//                         </FormControl>
//                     </FormItem>
//                 </FormItem>
//             )} />
//             <FormField control={control} name='category_id' render={({ field }) => (
//                 <FormItem>
//                     <FormLabel>Quiz category</FormLabel>
//                     <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={`${field.value}`}>
//                         <FormControl>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Select a verified email to display" />
//                             </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                             {quizCategories.map(quizCategory => (
//                                 <SelectItem key={quizCategory.id} value={`${quizCategory.id}`}>{quizCategory.name}</SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                     <FormMessage />
//                 </FormItem>
//             )} />
//             <FormField
//                 control={control}
//                 name="level"
//                 render={({ field }) => (
//                     <FormItem className="space-y-3">
//                         <FormLabel>Level</FormLabel>
//                         <FormControl>
//                             <RadioGroup
//                                 onValueChange={field.onChange}
//                                 value={field.value}
//                                 className="flex space-y-1"
//                             >
//                                 {Object.values(QuizLevel).map((item) => (
//                                     <FormItem key={item} className="flex items-center space-x-3 space-y-0">
//                                         <FormControl>
//                                             <RadioGroupItem value={item} />
//                                         </FormControl>
//                                         <FormLabel className="font-normal">
//                                             {item}
//                                         </FormLabel>
//                                     </FormItem>
//                                 ))}
//                             </RadioGroup>
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />
//             <FormField
//                 control={control}
//                 name="quiz_result_mode"
//                 render={({ field }) => (
//                     <FormItem className="space-y-3">
//                         <FormLabel>Quiz result mode</FormLabel>
//                         <FormControl>
//                             <RadioGroup
//                                 onValueChange={field.onChange}
//                                 value={field.value}
//                                 className="flex space-y-1"
//                             >
//                                 {Object.values(QuizResultMode).map((item) => (
//                                     <FormItem key={item} className="flex items-center space-x-3 space-y-0">
//                                         <FormControl>
//                                             <RadioGroupItem value={item} />
//                                         </FormControl>
//                                         <FormLabel className="font-normal">
//                                             {item}
//                                         </FormLabel>
//                                     </FormItem>
//                                 ))}
//                             </RadioGroup>
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />
//             <FormField
//                 control={control}
//                 name="access_modifier"
//                 render={({ field }) => (
//                     <FormItem className="space-y-3">
//                         <FormLabel>Access modifier</FormLabel>
//                         <FormControl>
//                             <RadioGroup
//                                 onValueChange={field.onChange}
//                                 value={field.value}
//                                 className="flex space-y-1"
//                             >
//                                 {Object.values(AccessModifier).map((item) => (
//                                     <FormItem key={item} className="flex items-center space-x-3 space-y-0">
//                                         <FormControl>
//                                             <RadioGroupItem value={item} />
//                                         </FormControl>
//                                         <FormLabel className="font-normal">
//                                             {item}
//                                         </FormLabel>
//                                     </FormItem>
//                                 ))}
//                             </RadioGroup>
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />
//             <div className='grid grid-cols-2 gap-4'>
//                 <FormField
//                     control={control}
//                     name="completed"
//                     render={({ field }) => (
//                         <FormItem className='flex flex-col'>
//                             <FormLabel>Completed</FormLabel>
//                             <FormControl>
//                                 <Switch
//                                     checked={field.value}
//                                     onCheckedChange={field.onChange}
//                                 />
//                             </FormControl>
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={control}
//                     name="shuffle_question"
//                     render={({ field }) => (
//                         <FormItem className='flex flex-col'>
//                             <FormLabel>Shuffle question</FormLabel>
//                             <FormControl>
//                                 <Switch
//                                     checked={field.value}
//                                     onCheckedChange={field.onChange}
//                                 />
//                             </FormControl>
//                         </FormItem>
//                     )}
//                 />
//             </div>
//             <FormField control={control} name='duration' render={({ field }) => (
//                 <FormItem>
//                     <FormLabel>Duration</FormLabel>
//                     <FormControl>
//                         <Input type='number' min={5} placeholder="Duration"
//                             value={field.value ?? ""}
//                             onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
//                         />
//                     </FormControl>
//                     <FormMessage />
//                 </FormItem>
//             )} />
//             <FormField control={control} name='description' render={({ field }) => (
//                 <FormItem>
//                     <FormLabel>Description</FormLabel>
//                     <FormControl>
//                         <Textarea placeholder='Description' {...field} />
//                     </FormControl>
//                     <FormMessage />
//                 </FormItem>
//             )} />
//             <FormItem>
//                 <FormLabel>Image</FormLabel>
//                 <FormControl>
//                     <Input type='file' accept='image/*' name='image' placeholder='Image' required
//                         onChange={onChangeImage}
//                     />
//                 </FormControl>
//                 {image?.error && <FormMessage />}
//             </FormItem>
//             <ButtonSubmit onReset={onReset} isSubmitting={formState.isSubmitting} />
//         </>
//     )
// }

export default QuizBasicInfo