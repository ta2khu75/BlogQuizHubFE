"use client"
import React, { memo, useMemo, useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import {
    Editable,
    Slate,
    withReact,
} from "slate-react";

import { toggleMark, withImage, withInline } from "@/components/elements/util/TextEditor/TextEditorUtil";
import TextEditorTool from "@/components/elements/util/TextEditor/TextEditorTool";
import { CustomElement, CustomText, EditorType, TextEditorMark } from "@/components/elements/util/TextEditor/TextEditorType";
import { RenderElement } from "@/components/elements/util/TextEditor/TextEditorRender";
import { RenderLeaf } from "@/components/elements/util/TextEditor/TextEditorLeaf";

interface TextEditorProps {
    name: string;
    placeholder: string;
    initialValue?: string;
    className?: string
    onChange: (value: string) => void;
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

    const initValue = useMemo(() => {
        const content = localStorage.getItem('content') || initialValue;
        if (content) {
            onChange(content)
            return JSON.parse(content)
        }
        return [{
            type: 'paragraph',
            children: [{ text: '' }],
        }]
    },
        [initialValue]
    )

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
            editor={editor}
            onValueChange={(value) => {
                const valueString = JSON.stringify(value)
                localStorage.setItem('content', valueString)
                console.log(valueString);
                onChange(valueString);
            }}
            initialValue={initValue}
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