import { FormControl, FormLabel, FormMessage } from '@/components/ui/form'
type Props = {
    label?: string,
    isMessage?: boolean,
    children: React.ReactNode,

}
const FormItem = ({ label, isMessage = true, children }: Props) => {
    return (
        <>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                {children}
            </FormControl>
            {isMessage && <FormMessage />}
        </>
    )
}

export default FormItem