"use client"
import { TextEditorAction, TEXT_FORMATS, TEXT_BLOCKS, TextEditorMark } from "@/components/elements/util/slate/TextEditorAction";
import { ElementKey } from "@/components/elements/util/slate/TextEditorType";
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from "@/components/elements/util/slate/TextEditorUtil";
import { Button } from "@/components/ui/button";
import { useSlate } from "slate-react";


export default function TextEditorTool() {
    const editor = useSlate();

    const onMarkClick = (id: TextEditorAction) => {
        toggleMark(editor, id as TextEditorMark);
    };

    const getMarkSelectionProps = (id: TextEditorAction) => {
        if (isMarkActive(editor, id as TextEditorMark))
            return undefined
        return "outline"
    };

    const onBlockClick = (id: TextEditorAction) => {
        toggleBlock(editor, id as ElementKey);
    };

    const getBlockSelectionProps = (id: TextEditorAction) => {
        if (isBlockActive(editor, id as ElementKey))
            return undefined
        return "outline"
    };

    return (
        <div className="flex flex-row gap-2">
            {/* <Select onValueChange={(value) => toggleBlock(editor, value as ElementKey)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {HEADINGS.map((heading) => (
                            <SelectItem key={heading} value={heading}>{heading}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select> */}
            {TEXT_FORMATS.map(({ id, icon }) => (
                <Button
                    key={id}
                    onMouseDown={() => onMarkClick(id)}
                    variant={getMarkSelectionProps(id)}
                >
                    {icon}
                </Button>
            ))}
            {TEXT_BLOCKS.map(({ id, icon }) => (
                <Button
                    key={id}
                    variant={getBlockSelectionProps(id)}
                    onMouseDown={() => onBlockClick(id)}
                >{icon}</Button>
            ))}
        </div>
    );
}