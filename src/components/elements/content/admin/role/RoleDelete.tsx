import Confirm from "@/components/common/Confirm"
import RoleService from "@/services/RoleService"
import { handleMutation } from "@/util/mutation"
import StateHelpers from "@/util/StateHelpers"
import { Dispatch, SetStateAction } from "react"

type Props = {
    setRoles: Dispatch<SetStateAction<RoleResponse[]>>,
    open: boolean,
    role: RoleResponse,
    setOpen: Dispatch<SetStateAction<boolean>>,
}
const RoleDelete = ({ open, setRoles, role, setOpen }: Props) => {
    const onCancel = () => {
        setOpen(false)
    }
    const onContinue = () => {
        handleMutation<void>(() => RoleService.delete(role.id), () => {
            setOpen(false)
            StateHelpers.removeItemById<RoleResponse>(setRoles, role.id)
        }, undefined,
            { success: 'Delete success', error: 'Delete failed' })
    }
    return (
        <Confirm open={open} title={`Are you want delete role ${role?.name} ?`} onCancel={onCancel} onContinue={onContinue} />
    )
}

export default RoleDelete