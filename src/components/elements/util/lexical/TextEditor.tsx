"use client"
import React, { memo, useMemo } from 'react'
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { HeadingNode } from "@lexical/rich-text"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import TextEditorTool from '@/components/elements/util/lexical/TextEditorTool'
import { EditorThemeClasses } from 'lexical'
import CustomOnChangePlugin from '@/components/elements/util/lexical/TextEditorChange'
const theme: EditorThemeClasses = {
    text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
        strikethrough: "line-through",
        subscript: "align-sub text-sm",
        superscript: "align-super text-sm",
        highlight: "bg-yellow-200",
        code: "bg-black text-white p-2 border-2 border-gray-400",
    }
}
interface TextEditorProps {
    value: string,
    onChange: (value: string) => void
    placeholder?: string
    name: string
}
const TextEditor = memo(
    function TextEditor({ value, onChange, placeholder, name }: TextEditorProps) {
        const initialConfig = useMemo(() => ({
            namespace: "TextEditor",
            theme,
            onError: () => { },
            nodes: [HeadingNode, CodeNode, CodeHighlightNode],
        }), [name])
        return (
            <div>
                <LexicalComposer initialConfig={initialConfig}>
                    <TextEditorTool />
                    <div className='relative'>
                        <RichTextPlugin contentEditable={
                            <ContentEditable className='w-96 border-2 h-32 p-2' />
                        } placeholder={<div className='absolute top-3 left-2 text-gray-400'>{placeholder}</div>} ErrorBoundary={LexicalErrorBoundary} />
                    </div>
                    <AutoFocusPlugin />
                    <HistoryPlugin />
                    <CustomOnChangePlugin value={value} onChange={onChange} />
                </LexicalComposer>
            </div>
        )
    });

export default TextEditor