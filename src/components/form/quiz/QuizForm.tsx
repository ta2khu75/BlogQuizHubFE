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
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import QuestionList from '@/components/form/quiz/QuestionList'
import QuizFormSync from '@/components/form/quiz/QuizFormSync'
type Props = {
    quiz?: QuizResponse,
    onSubmit: (quiz: QuizRequest, image?: File) => void,
    quizCategories: QuizCategoryResponse[]
}
const QuizForm = ({ quiz, onSubmit, quizCategories }: Props) => {
    const defaultQuestion: QuestionDto = useMemo(() => ({ content: "", type: QuestionType.SINGLE_CHOICE, shuffle_answer: false, answers: Array(4).fill({ content: "", correct: false }) }), []);
    const defaultQuiz: QuizRequest = useMemo(() => ({
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
    }), [defaultQuestion])
    const form = useForm<QuizRequest>({
        resolver: zodResolver(quizSchema),
        defaultValues: defaultQuiz,
    })
    console.log("error", form.formState.errors);

    const [openInfo, setOpenInfo] = useState(false)
    useEffect(() => {
        if (quiz) form.reset({ ...quiz, category_id: quiz.category.id })
    }, [quiz, form])
    const onResetBaseInfo = useCallback(() => {
        const questions = form.getValues("questions")
        if (quiz) {
            form.reset({ ...quiz, category_id: quiz?.category.id, questions })
        }
        else {
            form.reset({ ...defaultQuiz, questions })
        }
    }, [quiz, form, defaultQuiz])
    return (
        <Form {...form}>
            <FormProvider {...form}>
                <form className='w-full flex flex-col gap-4'>
                    <QuizFormSync />
                    <Button type='button' variant={"info"} onClick={() => setOpenInfo(true)}>Basic information</Button>
                    <Modal title='Basic information' open={openInfo} setOpen={setOpenInfo} >
                        <QuizBasicInfo onSubmit={onSubmit} onReset={onResetBaseInfo} quizCategories={quizCategories} />
                    </Modal>
                    <QuestionList quiz={quiz} defaultQuiz={defaultQuiz} />
                </form>
            </FormProvider>
        </Form>
    )
}

export default QuizForm