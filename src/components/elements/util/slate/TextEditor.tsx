"use client"
import React, { useState } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import {
    Editable,
    RenderElementProps,
    RenderLeafProps,
    Slate,
    withReact,
} from "slate-react";

import { toggleMark } from "@/components/elements/util/slate/TextEditorUtil";
import { CustomElement, CustomText, EditorType } from "@/components/elements/util/slate/TextEditorType";
import TextEditorTool from "@/components/elements/util/slate/TextEditorTool";
import { TextEditorMark } from "@/components/elements/util/slate/TextEditorAction";

interface RichTextEditorProps {
    name: string;
    placeholder: string;
    initialValue: Descendant[] | undefined;
    onChange: (value: Descendant[]) => void;
}

declare module "slate" {
    interface CustomTypes {
        Editor: EditorType;
        Element: CustomElement;
        Text: CustomText;
    }
}

const RenderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.superscript) {
        children = <sup>{children}</sup>;
    }
    if (leaf.subscript) {
        children = <sub>{children}</sub>;
    }

    return (
        <span
            {...attributes}
            style={{
                ...(leaf.bold && { fontWeight: "bold" }),
                ...(leaf.italic && { fontStyle: "italic" }),
                ...(leaf.underline && { textDecoration: "underline" }),
                ...(leaf.strikethrough && { textDecoration: "line-through" }),
                ...(leaf.code && {
                    color: "black",
                    padding: 2,
                    fontSize: 12,
                    fontFamily: "monospace",
                    background: "#eee",
                }),
                ...(leaf.highlight && {
                    color: "black",
                    padding: 2,
                    background: "#f3ff63",
                    border: "1px solid #c6c202",
                }),
            }}
        >
            {children}
        </span>
    );
};

const RenderElement = ({
    attributes,
    children,
    element,
}: RenderElementProps) => {
    const style = { textAlign: element.align };

    switch (element.type) {
        case "block-quote": {
            return (
                <blockquote
                    style={{
                        ...style,
                        borderLeft: "2px solid #ddd",
                        paddingLeft: 10,
                        color: "#aaa",
                        fontStyle: "italic",
                    }}
                    {...attributes}
                >
                    {children}
                </blockquote>
            );
        }
        case "numbered-list": {
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            );
        }
        case "bulleted-list": {
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            );
        }
        case "list-item": {
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            );
        }
        case "h1": {
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            );
        }
        case "h2": {
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            );
        }
        case "h3": {
            return (
                <h3 style={style} {...attributes}>
                    {children}
                </h3>
            );
        }
        case "h4": {
            return (
                <h4 style={style} {...attributes}>
                    {children}
                </h4>
            );
        }
        case "h5": {
            return (
                <h5 style={style} {...attributes}>
                    {children}
                </h5>
            );
        }
        case "h6": {
            return (
                <h6 style={style} {...attributes}>
                    {children}
                </h6>
            );
        }
        default: {
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            );
        }
    }
};

export const TextEditor: React.FC<RichTextEditorProps> = React.memo(
    function RichTextEditor({ name, placeholder, onChange, initialValue }) {
        const [editor] = useState(withHistory(withReact(createEditor())));

        if (!initialValue) return null;

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
            <div className="flex flex-col">
                <Slate
                    editor={editor}
                    initialValue={initialValue}
                    onChange={(value) => {
                        onChange(value);
                    }}
                >
                    <TextEditorTool />
                    <Editable
                        name={name}
                        placeholder={placeholder}
                        autoFocus
                        renderLeaf={RenderLeaf}
                        renderElement={RenderElement}
                        onKeyDown={onKeyDown}
                    />
                </Slate>
            </div>
        );
    }
);