import { Button } from '@/components/ui/button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from '@lexical/list'
import { List, ListOrdered } from 'lucide-react'
import React from 'react'
import { getSelected } from '@/components/common/RichTextEditor/plugin/Util'
type Props = {
    blockType: string,
}
const ListPlugin = ({ blockType }: Props) => {
    const [editor] = useLexicalComposerContext()
    return (
        <>
            <Button type='button' variant={getSelected(blockType === "ul")} onClick={() => {
                if (blockType == "ul") {
                    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
                }
                else editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
            }}><List /></Button>
            <Button type='button' variant={getSelected(blockType === "ol")} onClick={() => {
                if (blockType == "ol") {
                    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
                }
                else editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
            }}><ListOrdered /></Button>
        </>
    )
}

export default ListPlugin