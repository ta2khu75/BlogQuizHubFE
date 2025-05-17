import ButtonSubmit from '@/components/common/ButtonSubmit'
import Modal from '@/components/common/Modal'
import QuizBasicInfo from '@/components/form/quiz/QuizBasicInfo'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { AccessModifier } from '@/types/AccessModifier'
import { QuizResultMode } from '@/types/DisplayMode'
import { QuestionDto } from '@/types/dto/QuestionDto'
import { QuestionType } from '@/types/QuestionType'
import { QuizLevel } from '@/types/QuizLevel'
import { QuizRequest, quizSchema } from '@/types/request/QuizRequest'
import { QuizResponse } from '@/types/response/QuizResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import QuestionList from '@/components/form/quiz/QuestionList'
type Props = {
    quiz?: QuizResponse,
    onSubmit: (quiz: QuizRequest) => void,
    quizCategories: QuizCategoryResponse[]
}
const QuizForm = ({ quiz, onSubmit, quizCategories }: Props) => {
    const defaultQuestion: QuestionDto = { content: "", type: QuestionType.SINGLE_CHOICE, shuffle_answer: false, answers: Array(4).fill({ content: "", correct: false }) };
    const defaultValues: QuizRequest = {
        title: '',
        blog_id: undefined,
        category_id: 0,
        level: QuizLevel.EASY,
        quiz_result_mode: QuizResultMode.ANSWER_VISIBLE,
        access_modifier: AccessModifier.PUBLIC,
        completed: false,
        shuffle_question: false,
        duration: 5,
        description: '',
        questions: [defaultQuestion]
    }
    const form = useForm<QuizRequest>({
        resolver: zodResolver(quizSchema),
        defaultValues,
        // shouldUnregister: false
    })
    const [openInfo, setOpenInfo] = useState(false)
    useEffect(() => {
        if (quiz) form.reset({ ...quiz, category_id: quiz.category.id })
    }, [quiz])
    return (
        <Form {...form}>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
                    <Button type='button' onClick={() => setOpenInfo(true)}>Open</Button>
                    <Modal open={openInfo} onCancel={() => setOpenInfo(false)} >
                        <QuizBasicInfo quizCategories={quizCategories} />
                    </Modal>
                    <QuestionList defaultQuestion={defaultQuestion} />
                    <ButtonSubmit isSubmitting={form.formState.isSubmitting} />
                </form>
            </FormProvider>
        </Form>
    )
}

export default QuizForm