import { HEADINGS, LOW_PRIORIRTY, RICH_TEXT_OPTIONS, RichTextAction } from '@/components/common/RichTextEditor/plugin/Constants'
import TooltipElement from '@/components/common/TooltipElement'
import { Separator } from '@/components/ui/separator'
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, REDO_COMMAND, SELECTION_CHANGE_COMMAND, UNDO_COMMAND } from 'lexical'
import { useEffect, useState } from 'react'
import { mergeRegister, $getNearestNodeOfType } from "@lexical/utils"
import { Button } from '@/components/ui/button'
import { $isLinkNode } from '@lexical/link';
import SelectElement from '@/components/common/SelectElement'
import { HeadingTagType, $createHeadingNode, HeadingNode } from "@lexical/rich-text"
import { $setBlocksType } from "@lexical/selection"
import useKeyBindings from '@/components/common/RichTextEditor/plugin/useKeyBindings'
import ColorPlugin from '@/components/common/RichTextEditor/plugin/ColorPlugin'
import ListPlugin from '@/components/common/RichTextEditor/plugin/ListPlugin'
import { $isListNode, ListNode } from "@lexical/list"
import { getSelected } from '@/components/common/RichTextEditor/plugin/Util'
import ImagePlugin from '@/components/common/RichTextEditor/plugin/ImagePlugin'
import LinkPlugin from '@/components/common/RichTextEditor/plugin/LinkPlugin'
const ToolbarPlugin = () => {
    const [editor] = useLexicalComposerContext()
    const [blockType, setBlockType] = useState("paragraph")
    const [disableRecord, setDisableRecord] = useState<Partial<Record<RichTextAction, boolean>>>({
        [RichTextAction.Undo]: true,
        [RichTextAction.Redo]: true
    })
    const [isLink, setIsLink] = useState(false)
    const [selectedHeading, setSelectedHeading] = useState<string>()
    const [selectionRecord, setSelectionRecord] = useState<Partial<Record<RichTextAction, boolean>>>({
    })
    const updateToolbar = () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            // Tìm node heading gần nhất
            const parent = anchorNode.getParent();

            if (parent instanceof HeadingNode) {
                const tag = parent.getTag(); // Trả về 'h1', 'h2', ...
                setSelectedHeading(tag as string); // <- bạn cần một state để lưu heading hiện tại
            } else {
                setSelectedHeading(undefined); // Không phải heading
            }
            setIsLink($isLinkNode(parent));

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

            const element = anchorNode.getKey() === "root" ? anchorNode : anchorNode.getTopLevelElementOrThrow();
            const elementKey = element.getKey();
            const elementDOM = editor.getElementByKey(elementKey);
            setBlockType("paragraph")
            if (!elementDOM) return
            if ($isListNode(element)) {
                const parentList = $getNearestNodeOfType(anchorNode, ListNode);
                const type = parentList ? parentList.getTag() : element.getTag()
                setBlockType(type);
            }
        }
    }
    const updateHeading = (heading: HeadingTagType) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(heading))
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
    useKeyBindings({ onAction })
    return (
        <div>

            <div className='flex flex-wrap gap-1'>
                <SelectElement value={selectedHeading} defaultValue='paragraph' className='w-36' options={HEADINGS.map((heading) => ({ value: heading, label: heading }))} onChange={(value) => updateHeading(value as HeadingTagType)} />
                <Separator orientation="vertical" className='h-10 bg-black' />
                {RICH_TEXT_OPTIONS.map(({ label, id, icon }, index) => {
                    if (id === RichTextAction.Divider) {
                        return <Separator orientation="vertical" className='mx-2 h-10 bg-black' key={`separator-${id}-${index}`} />
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
            <div className='flex gap-1'>
                <ColorPlugin />
                <ImagePlugin />
                <ListPlugin blockType={blockType} />
                <LinkPlugin isLink={isLink} />
            </div>
        </div>
    )
}

export default ToolbarPlugin