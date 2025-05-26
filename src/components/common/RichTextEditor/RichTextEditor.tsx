/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useMemo } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HeadingNode } from "@lexical/rich-text"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import ToolbarPlugin from '@/components/common/RichTextEditor/plugin/ToolbarPlugin';
import { EditorThemeClasses } from 'lexical';
import { ListItemNode, ListNode } from "@lexical/list"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import CustomOnChangePlugin from '@/components/common/RichTextEditor/plugin/CustomOnChangePlugin';
import { ImageNode } from '@/components/common/RichTextEditor/plugin/nodes/ImageNode';
const theme: EditorThemeClasses = {
    heading: {
        h1: "text-6xl",
        h2: "text-5xl",
        h3: "text-4xl",
        h4: "text-3xl",
        h5: "text-2xl",
        h6: "text-xl",
        paragraph: "text-base",
    },
    list: {
        ul: "list-disc",
        ol: "list-decimal",
    },
    text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
        strikethrough: "line-through",
        superscript: "sup",
        subscript: "sub",
        highlight: "text-black p-1 bg-yellow-300 border border-yellow-600",
        code: "text-black p-1 text-sm font-mono bg-gray-200",
    }
}
type Props = {
    value?: any,
    onChange: (value: any) => void
    placeholder?: string,
    name: string;
}
const RichTextEditor = ({ name, value, onChange, placeholder }: Props) => {
    const initialConfig = useMemo(() => ({
        namespace: name,
        theme,
        onError: (error: any) => {
            console.log(error)
        },
        nodes: [HeadingNode, CodeHighlightNode, CodeNode, ListNode, ListItemNode, ImageNode]
    }), [name])
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <ToolbarPlugin />
            <div className='relative'>
                <RichTextPlugin
                    contentEditable={<ContentEditable className={"w-full p-2 min-h-96 border border-gray-400"} />}
                    placeholder={<div className='absolute top-2 left-2 text-gray-400'>{placeholder}</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </div>
            <CustomOnChangePlugin value={value} onChange={onChange} />
            <AutoFocusPlugin />
            <HistoryPlugin />
            <ListPlugin />
        </LexicalComposer>
    )
}

export default memo(RichTextEditor)