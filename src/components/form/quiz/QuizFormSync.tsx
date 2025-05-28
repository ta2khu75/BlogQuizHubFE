import { useAppSelector } from '@/redux/hooks'
import { QuizFormActions } from '@/redux/slice/QuizFormSlice'
import { QuizRequest } from '@/types/request/QuizRequest'
import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const QuizFormSync = () => {
    const { control, reset } = useFormContext<QuizRequest>()
    const quizForm = useAppSelector((state) => state.quizForm.form)
    const dispatch = useDispatch()
    const formValue = useWatch({ control })
    useEffect(() => {
        if (quizForm) {
            return reset(quizForm)
        }
    }, [])
    useEffect(() => {
        if (formValue) {
            dispatch(QuizFormActions.set(formValue as QuizRequest));
        }
    }, [dispatch, formValue])

    return null
}

export default QuizFormSync