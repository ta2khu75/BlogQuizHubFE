import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QuestionType } from '@/types/QuestionType'
import { Switch } from '@/components/ui/switch'
import { QuizRequest } from '@/types/request/QuizRequest'
import AnswerList from '@/components/form/quiz/AnswerList'
import { useFormContext } from 'react-hook-form'
type Props = {
    name: `questions.${number}`;
}
const QuestionForm = ({ name }: Props) => {
    const form = useFormContext<QuizRequest>()
    return (
        <div className='w-full flex flex-col gap-4'>
            <FormField control={form.control} name={`${name}.content`} render={({ field }) => (
                <FormItem className='w-full'>
                    <FormLabel>Question</FormLabel>
                    <FormControl >
                        <Input type='text' placeholder="Question" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField
                control={form.control}
                name={`${name}.type`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Question type</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex space-y-1"
                            >
                                {Object.values(QuestionType).map((item, index) => (
                                    <FormItem key={index} className="flex items-center space-x-3 space-y-0">
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
                control={form.control}
                name={`${name}.shuffle_answer`}
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel>Shuffle answer</FormLabel>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <AnswerList name={name} />
        </div>
    )
}

export default QuestionForm