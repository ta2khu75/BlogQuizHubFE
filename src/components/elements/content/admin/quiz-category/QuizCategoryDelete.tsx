import Confirm from "@/components/common/Confirm"
import QuizCategoryService from "@/services/QuizCategoryService"
import { handleMutation } from "@/util/mutation"
import StateHelpers from "@/util/StateHelpers"
import { Dispatch, SetStateAction } from "react"

type Props = {
    setQuizCategories: Dispatch<SetStateAction<QuizCategoryResponse[]>>,
    quizCategory: QuizCategoryResponse,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}
const QuizCategoryDelete = ({ setQuizCategories, quizCategory, open, setOpen }: Props) => {
    const onCancel = () => {
        setOpen(false)
    }
    const onContinue = () => {
        handleMutation<QuizCategoryResponse, void>(quizCategory, (val) => QuizCategoryService.delete(val.id), () => {
            setOpen(false)
            StateHelpers.removeItemById<RoleResponse>(setQuizCategories, quizCategory.id)
        }, undefined,
            { success: 'Delete success', error: 'Delete failed' })
    }
    return (
        <Confirm open={open} title={`Are you want delete quiz category ${quizCategory?.name} ?`} onCancel={onCancel} onContinue={onContinue} />
    )
}

export default QuizCategoryDelete 