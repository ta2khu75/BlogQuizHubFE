import React from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HeadingNode } from "@lexical/rich-text"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"

const initialConfig = {
    namespace: "RickTextEditor",
    theme: {},
    onError: () => { },
    nodes: [HeadingNode, CodeHighlightNode, CodeNode]
}
const RichTextEditor = () => {

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className='relative'>
                <RichTextPlugin
                    contentEditable={<ContentEditable className={"w-full p-2 h-96 border border-gray-400"} />}
                    placeholder={<div className='absolute top-2 left-2 text-gray-400'>Some text</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </div>
            <AutoFocusPlugin />
        </LexicalComposer>
    )
}

export default RichTextEditor; 