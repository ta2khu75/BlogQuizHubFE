import { LOW_PRIORIRTY, RichTextAction } from "@/components/common/RichTextEditor/plugin/Constants"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { KEY_ENTER_COMMAND } from "lexical"
import { useEffect } from "react"

type Props = {
    onAction: (id: RichTextAction) => void
}
const useKeyBindings = ({ onAction }: Props) => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        editor.registerCommand(KEY_ENTER_COMMAND, (event) => {
            if (event?.key === "B" && event?.ctrlKey)
                onAction(RichTextAction.Bold);
            if (event?.key === "I" && event?.ctrlKey)
                onAction(RichTextAction.Italic);
            if (event?.key === "U" && event?.ctrlKey)
                onAction(RichTextAction.Underline);
            if (event?.key === "Z" && event?.ctrlKey)
                onAction(RichTextAction.Undo);
            if (event?.key === "Y" && event?.ctrlKey)
                onAction(RichTextAction.Redo);
            return false
        }, LOW_PRIORIRTY)
    }, [])
    return (
        <div>useKeyBindings</div>
    )
}

export default useKeyBindings