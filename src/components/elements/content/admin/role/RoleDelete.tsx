import Confirm from "@/components/common/Confirm"
import { roleHooks } from "@/redux/api/roleApi"
import { handleMutation } from "@/util/mutation"
import { Dispatch, SetStateAction } from "react"

type Props = {
    open: boolean,
    role: RoleResponse,
    setOpen: Dispatch<SetStateAction<boolean>>,
}
const RoleDelete = ({ open, role, setOpen }: Props) => {
    const [deleteRole, { isLoading }] = roleHooks.useDeleteRoleMutation()
    const onCancel = () => {
        setOpen(false)
    }
    const onContinue = () => {
        if (isLoading) return
        handleMutation<void>(() => deleteRole(role.id).unwrap(), () => {
            setOpen(false)
        }, undefined, { success: 'Delete success', error: 'Delete failed' })
    }
    return (
        <Confirm open={open} title={`Are you want delete role ${role?.name} ?`} onCancel={onCancel} onContinue={onContinue} />
    )
}

export default RoleDelete