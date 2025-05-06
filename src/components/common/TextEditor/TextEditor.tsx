import { RenderLeaf } from "@/components/common/TextEditor/TextEditorLeaf";
import { RenderElement } from "@/components/common/TextEditor/TextEditorRender";
import TextEditorTool from "@/components/common/TextEditor/TextEditorTool";
import { CustomElement, CustomText, EditorType, TextEditorMark } from "@/components/common/TextEditor/TextEditorType";
import { toggleMark, withImage, withInline } from "@/components/common/TextEditor/TextEditorUtil";
import React, { memo, useMemo, useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import {
    Editable,
    Slate,
    withReact,
} from "slate-react";

// import { toggleMark, withImage, withInline } from "@/components/elements/util/TextEditor/TextEditorUtil";
// import TextEditorTool from "@/components/elements/util/TextEditor/TextEditorTool";
// import { CustomElement, CustomText, EditorType, TextEditorMark } from "@/components/elements/util/TextEditor/TextEditorType";
// import { RenderElement } from "@/components/elements/util/TextEditor/TextEditorRender";
// import { RenderLeaf } from "@/components/elements/util/TextEditor/TextEditorLeaf";

interface TextEditorProps {
    name: string;
    placeholder: string;
    initialValue: string;
    className?: string;
    onChange: (value: string) => void;
    // isReset?: boolean
}

declare module "slate" {
    interface CustomTypes {
        Editor: EditorType;
        Element: CustomElement;
        Text: CustomText;
    }
}

const TextEditor = ({ name, placeholder, onChange, initialValue, className }: TextEditorProps) => {
    const [editor] = useState(withImage(withInline(withHistory(withReact(createEditor())))));
    const defaultValue = [{ type: 'paragraph', children: [{ text: '' }] }]
    const [key, setKey] = useState(0);
    const initValue = useMemo(() => {
        if (initialValue) {
            const initValue = JSON.parse(initialValue)
            if (initValue.length === 0) return defaultValue
            setKey(prev => prev + 1);
            return initValue;
        } else {
            setKey(prev => prev + 1);
            return defaultValue
        }
    }, [initialValue]);
    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
        const key = event?.key?.toLowerCase();
        if (key === "b" && event?.ctrlKey) {
            toggleMark(editor, TextEditorMark.Bold);
        }
        if (key === "i" && event?.ctrlKey) {
            toggleMark(editor, TextEditorMark.Italic);
        }
        if (key === "u" && event?.ctrlKey) {
            toggleMark(editor, TextEditorMark.Underline);
        }
        if (key === "z" && event?.ctrlKey) {
            editor.undo();
        }
        if (key === "y" && event?.ctrlKey) {
            editor.redo();
        }
    };
    return (
        <Slate
            key={key}
            editor={editor}
            onValueChange={(value) => {
                onChange(JSON.stringify(value));
            }}
            initialValue={initValue.length === 0 ? [{ type: 'paragraph', children: [{ text: '' }] }] : initValue}
        >
            <div>
                <TextEditorTool />
                <Editable
                    disableDefaultStyles
                    className={`border-2 border-black p-2 relative rounded-md ${className}`}
                    name={name}
                    renderPlaceholder={({ attributes }) => <span {...attributes} className="absolute">{placeholder}</span>}
                    placeholder={placeholder}
                    autoFocus
                    renderLeaf={RenderLeaf}
                    renderElement={RenderElement}
                    onKeyDown={onKeyDown}
                />
            </div>
        </Slate >
    );
}

export default memo(TextEditor);