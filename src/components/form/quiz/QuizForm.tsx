import ButtonSubmit from '@/components/common/ButtonSubmit'
import QuizBasicInfo from '@/components/form/quiz/QuizBasicInfo'
import { Form } from '@/components/ui/form'
import { QuizRequest, quizSchema } from '@/types/request/QuizRequest'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
type Props = {
    quiz?: QuizResponse,
    onSubmit: (quiz: QuizRequest) => void,
    quizCategories: QuizCategoryResponse[]
}
const QuizForm = ({ quiz, onSubmit, quizCategories }: Props) => {
    const form = useForm<QuizRequest>({
        resolver: zodResolver(quizSchema),
    })
    useEffect(() => {
        if (quiz) form.reset({ ...quiz, category_id: quiz.category.id })
    }, [quiz])
    return (
        <Form {...form}>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
                    <QuizBasicInfo quizCategories={quizCategories} />
                    <ButtonSubmit isSubmitting={form.formState.isSubmitting} />
                </form>
            </FormProvider>
        </Form>
    )
}

export default QuizForm