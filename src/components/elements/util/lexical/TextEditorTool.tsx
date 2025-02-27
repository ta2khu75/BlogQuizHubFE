import { HEADINGS, LOW_PRIORIRTY, RichTextAction, TEXT_BLOCK_OPTIONS, TEXT_FORMAT_OPTIONS } from '@/components/elements/util/slate/TextEditorAction'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, REDO_COMMAND, SELECTION_CHANGE_COMMAND, UNDO_COMMAND } from 'lexical'
import { mergeRegister } from '@lexical/utils'
import { HeadingTagType, $createHeadingNode } from "@lexical/rich-text"
import { $wrapNodes } from "@lexical/selection"
import React, { useEffect, useState } from 'react'
import { useKeyBinding } from '@/components/elements/util/lexical/useKeyBinding'

const TextEditorTool = () => {
    const [editor] = useLexicalComposerContext()
    const [disableMap, setDisableMap] = useState<{ [id: string]: boolean }>({ [RichTextAction.Undo]: true, [RichTextAction.Redo]: true });
    const [selectionMap, setSelectionMap] = useState<{ [id: string]: boolean }>({});
    const updateStatusTool = () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const newSelectionMap = {
                [RichTextAction.Bold]: selection.hasFormat("bold"),
                [RichTextAction.Italic]: selection.hasFormat("italic"),
                [RichTextAction.Underline]: selection.hasFormat("underline"),
                [RichTextAction.Highlight]: selection.hasFormat("highlight"),
                [RichTextAction.Strikethrough]: selection.hasFormat("strikethrough"),
                [RichTextAction.Superscript]: selection.hasFormat("superscript"),
                [RichTextAction.Subscript]: selection.hasFormat("subscript"),
                [RichTextAction.Code]: selection.hasFormat("code"),
            }
            setSelectionMap(newSelectionMap)
        }
    }
    // const updateHeading = (heading: HeadingTagType) => {
    //     editor.update(() => {
    //         const selection = $getSelection()
    //         if ($isRangeSelection(selection)) {
    //             $wrapNodes(selection, () => $createHeadingNode(heading))
    //         }
    //     })
    // }
    const updateHeading = (heading: HeadingTagType) => {
        editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                $wrapNodes(selection, () => $createHeadingNode(heading));
            }
        });
    };
    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateStatusTool()
                })
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                () => { updateStatusTool(); return false },
                LOW_PRIORIRTY
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => { setDisableMap(prevDisableMap => ({ ...prevDisableMap, undo: !payload })); return false },
                LOW_PRIORIRTY),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => { setDisableMap(prevDisableMap => ({ ...prevDisableMap, redo: !payload })); return false },
                LOW_PRIORIRTY
            ))
    }, [])
    const onAction = (id: RichTextAction) => {
        switch (id) {
            case RichTextAction.Bold:
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
                break;
            case RichTextAction.Italic:
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
                break;
            case RichTextAction.Underline:
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
                break;
            case RichTextAction.Strikethrough:
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
                break;
            case RichTextAction.Superscript:
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
                break;
            case RichTextAction.Subscript:
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
                break;
            case RichTextAction.Highlight:
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight")
                break;
            case RichTextAction.Code:
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
                break;
            case RichTextAction.LeftAlign:
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
                break;
            case RichTextAction.CenterAlign:
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
                break;
            case RichTextAction.RightAlign:
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
                break;
            case RichTextAction.JustifyAlign:
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
                break;
            // case RichTextAction.BlockQuote:
            //     break;
            // case RichTextAction.NumberedList:
            //     break;
            // case RichTextAction.BulletedList:
            //     break;
            case RichTextAction.Undo:
                editor.dispatchCommand(UNDO_COMMAND, undefined)
                break;
            case RichTextAction.Redo:
                editor.dispatchCommand(REDO_COMMAND, undefined)
                break;
        }
    }
    useKeyBinding({ onAction })
    return (
        <div className="flex flex-row gap-2">
            <Select onValueChange={(value) => updateHeading(value as HeadingTagType)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select heading" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {HEADINGS.map((heading) => (
                            <SelectItem key={heading} value={heading}>{heading}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {TEXT_FORMAT_OPTIONS.map(({ id, icon }) => (
                <Button
                    key={id}
                    onClick={() => onAction(id)}
                    variant={selectionMap[id] ? undefined : "outline"}
                >
                    {icon}
                </Button>
            ))}
            {TEXT_BLOCK_OPTIONS.map(({ id, icon }) => (
                <Button
                    key={id}
                    onClick={() => onAction(id)}
                    disabled={disableMap[id]}
                >{icon}</Button>
            ))}
        </div>
    )
}

export default TextEditorTool