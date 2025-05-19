import React from 'react'
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
import { cn } from '@/lib/utils';
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
    text: {
        bold: cn("font-bold"),
        italic: cn("italic"),
        underline: cn("underline"),
        strikethrough: cn("line-through"),
        superscript: cn("sup"),
        subscript: cn("sub"),
        highlight: cn("text-black p-1 bg-yellow-300 border border-yellow-600"),
        code: cn("text-black p-1 text-sm font-mono bg-gray-200"),
    }
}
const initialConfig = {
    namespace: "RickTextEditor",
    theme,
    onError: () => { },
    nodes: [HeadingNode, CodeHighlightNode, CodeNode]
}
const RichTextEditor = () => {
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <ToolbarPlugin />
            <div className='relative'>
                <RichTextPlugin
                    contentEditable={<ContentEditable className={"w-full p-2 h-96 border border-gray-400"} />}
                    placeholder={<div className='absolute top-2 left-2 text-gray-400'>Some text</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </div>
            <AutoFocusPlugin />
            <HistoryPlugin />
        </LexicalComposer>
    )
}

export default RichTextEditor 