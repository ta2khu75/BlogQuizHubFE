import { HEADINGS, LOW_PRIORIRTY, RICH_TEXT_OPTIONS, RichTextAction } from '@/components/common/RichTextEditor/plugin/Constants'
import TooltipElement from '@/components/common/TooltipElement'
import { Separator } from '@/components/ui/separator'
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, REDO_COMMAND, SELECTION_CHANGE_COMMAND, UNDO_COMMAND } from 'lexical'
import { useEffect, useState } from 'react'
import { mergeRegister } from "@lexical/utils"
import { Button } from '@/components/ui/button'
import SelectElement from '@/components/common/SelectElement'
import { HeadingTagType, $createHeadingNode, HeadingNode } from "@lexical/rich-text"
import { $wrapNodes } from "@lexical/selection"
const ToolbarPlugin = () => {
    const [editor] = useLexicalComposerContext()
    const [disableRecord, setDisableRecord] = useState<Partial<Record<RichTextAction, boolean>>>({
        [RichTextAction.Undo]: true,
        [RichTextAction.Redo]: true
    })
    const [selectedHeading, setSelectedHeading] = useState<string>()
    const [selectionRecord, setSelectionRecord] = useState<Partial<Record<RichTextAction, boolean>>>({
    })
    const updateToolbar = () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();

            // Tìm node heading gần nhất
            const headingNode = anchorNode.getParent();

            if (headingNode instanceof HeadingNode) {
                const tag = headingNode.getTag(); // Trả về 'h1', 'h2', ...
                setSelectedHeading(tag as string); // <- bạn cần một state để lưu heading hiện tại
            } else {
                setSelectedHeading(undefined); // Không phải heading
            }
            const newSelectionRecord = {
                [RichTextAction.Bold]: selection.hasFormat("bold"),
                [RichTextAction.Italic]: selection.hasFormat("italic"),
                [RichTextAction.Underline]: selection.hasFormat("underline"),
                [RichTextAction.Strikethrough]: selection.hasFormat("strikethrough"),
                [RichTextAction.Superscript]: selection.hasFormat("superscript"),
                [RichTextAction.Subscript]: selection.hasFormat("subscript"),
                [RichTextAction.Highlight]: selection.hasFormat("highlight"),
                [RichTextAction.Code]: selection.hasFormat("code"),
            }
            setSelectionRecord(newSelectionRecord);
        }
    }
    // const getSelections = () => {
    //     if (selectionRecord) {
    //         const data =
    //             Object.entries(selectionRecord)?.filter(([_, value]) => value)?.map(([key, _]) => key);
    //         console.log("data", data);
    //         return data

    //     }
    //     return [];
    // }
    const getSelected = (value?: boolean) => {
        if (value) {
            return "default"
        } return "outline"
    }
    const updateHeading = (heading: HeadingTagType) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $wrapNodes(selection, () => $createHeadingNode(heading))
            }
        })
    }
    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateToolbar()
                })
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                () => {
                    updateToolbar();
                    return false;
                },
                LOW_PRIORIRTY
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND, (payload) => {
                    setDisableRecord(prev => ({ ...prev, undo: !payload }))
                    return false;
                },
                LOW_PRIORIRTY
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND, (payload) => {
                    setDisableRecord(prev => ({ ...prev, redo: !payload }))
                    return false;
                },
                LOW_PRIORIRTY
            )
        )
    }, [])
    const onAction = (id: RichTextAction) => {
        switch (id) {
            case RichTextAction.Bold: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
                break;
            } case RichTextAction.Italic: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
                break;
            }
            case RichTextAction.Underline: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
                break;
            } case RichTextAction.Strikethrough: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
                break;
            } case RichTextAction.Superscript: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
                break;
            } case RichTextAction.Subscript: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
                break;
            } case RichTextAction.Highlight: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight")
                break;
            } case RichTextAction.Code: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
                break;
            } case RichTextAction.LeftAlign: {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
                break;
            } case RichTextAction.CenterAlign: {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
                break;
            } case RichTextAction.RightAlign: {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
                break;
            } case RichTextAction.JustifyAlign: {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
                break;
            } case RichTextAction.Undo: {
                editor.dispatchCommand(UNDO_COMMAND, undefined)
                break;
            } case RichTextAction.Redo: {
                editor.dispatchCommand(REDO_COMMAND, undefined)
                break;
            }
        }

    }

    return (
        <div className='flex flex-wrap h-10 gap-2'>
            {/* <h1 className='text-6xl'>minh</h1> */}
            <SelectElement value={selectedHeading} defaultValue='paragraph' className='w-36' options={HEADINGS.map((heading) => ({ value: heading, label: heading }))} onChange={(value) => updateHeading(value as HeadingTagType)} />
            <Separator orientation="vertical" className='mx-2 bg-black' />
            {RICH_TEXT_OPTIONS.map(({ label, id, icon }, index) => {
                if (id === RichTextAction.Divider) {
                    return <Separator orientation="vertical" className='mx-2 bg-black' key={`separator-${id}-${index}`} />
                }
                else if (label) {
                    return (
                        <TooltipElement content={label} key={id}>
                            <Button variant={getSelected(selectionRecord[id])} disabled={disableRecord[id]} onClick={() => onAction(id)}>
                                {icon}
                            </Button>
                        </TooltipElement>
                    )
                }
                return (
                    <Button variant={getSelected(selectionRecord[id])} onClick={() => onAction(id)} key={id}>
                        {icon}
                    </Button>
                )
            }
            )}
        </div>
    )
}

export default ToolbarPlugin