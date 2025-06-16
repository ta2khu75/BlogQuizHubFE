import Confirm from "@/components/common/Confirm"
import { quizCategoryHooks } from "@/redux/api/quizCategoryApi"
import { QuizCategoryResponse } from "@/types/response/QuizCategoryResponse"
import { handleMutation } from "@/util/mutation"
import { Dispatch, SetStateAction } from "react"

type Props = {
    quizCategory: QuizCategoryResponse,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}
const QuizCategoryDelete = ({ quizCategory, open, setOpen }: Props) => {
    const [deleteQuizCategory, { isLoading }] = quizCategoryHooks.useDeleteQuizCategoryMutation()
    const onCancel = () => {
        setOpen(false)
    }
    const onContinue = async () => {
        if (isLoading) return; // Prevent multiple submissions
        await handleMutation<void>(
            () => deleteQuizCategory(quizCategory.id).unwrap(),
            () => setOpen(false),
            error => console.log(error),
            { success: 'Delete success', error: 'Delete failed' })
    }
    return (
        <Confirm open={open} title={`Are you want delete quiz category ${quizCategory?.name} ?`} onCancel={onCancel} onContinue={onContinue} />
    )
}

export default QuizCategoryDelete 