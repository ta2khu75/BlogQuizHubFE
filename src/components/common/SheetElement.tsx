import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { ReactNode } from "react"
type Props = {
    open: boolean,
    title?: string,
    description?: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children: ReactNode
}
const SheetElement = ({ open, setOpen, title, description, children }: Props) => {
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="flex flex-col h-full">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={() => setOpen(false)} type="button">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
export default SheetElement