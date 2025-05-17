import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { QuestionType } from '@/types/QuestionType';
import { QuizRequest } from '@/types/request/QuizRequest';
import { CheckedState } from '@radix-ui/react-checkbox';
import { FileX2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
type Props = {
    answerIndex: number,
    questionType: QuestionType,
    name: `questions.${number}.answers.${number}`
    questionName: `questions.${number}`
    checked: boolean;
    onDelete: () => void
    onCheckboxChange: (value: CheckedState) => void
}
const AnswerForm = ({ answerIndex, name, questionName, questionType, checked, onCheckboxChange, onDelete }: Props) => {
    const form = useFormContext<QuizRequest>()
    const answersLength = form.getValues(`${questionName}.answers`).length
    return (
        <div className="flex items-start gap-2">
            <FormItem className="flex items-center pt-[10px]">
                {/* pt để cân bằng với chiều cao input + message lỗi */}
                <FormControl>
                    {questionType === QuestionType.MULTIPLE_CHOICE ? (
                        <Checkbox checked={checked} onCheckedChange={onCheckboxChange} />
                    ) : (
                        <RadioGroupItem checked={checked} value={`${answerIndex}`} />
                    )}
                </FormControl>
            </FormItem>

            <div className="flex flex-col flex-1 gap-1">
                <FormField
                    control={form.control}
                    name={`${name}.content`}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input type="text" placeholder="Answer" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <Button
                variant="destructive"
                type="button"
                onClick={onDelete}
                disabled={answersLength <= 2}
            >
                <FileX2 />
            </Button>
        </div>
    )
}
export default AnswerForm