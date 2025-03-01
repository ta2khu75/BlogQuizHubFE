import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { FileImage, Link, List, ListOrdered, SquareTerminal } from 'lucide-react';
import React, { Children, useCallback, useMemo, useState } from 'react'
import { createEditor, BaseEditor, Descendant, Editor, Element, Transforms } from 'slate'
import { Slate, withReact, Editable, ReactEditor } from 'slate-react'
import YouTube from 'react-youtube';
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { url } from 'inspector';
type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }
declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}
// const initialValue = [
//     {
//         type: 'paragraph',
//         children: [{ text: 'A line of text in a paragraph.' }],
//     },
//     {
//         type: 'code',
//         children: [{ text: 'A line of code' }],
//     },
//     // {
//     //     type: 'image',
//     //     children: [{ text: '' }],
//     //     url: 'https://firebasestorage.googleapis.com/v0/b/blog-exam-master.appspot.com/o/EXAM_FOLDER_0653a5d1-6a67-4eaa-9eae-00cddd34e26d.png?alt=media'
//     // },
// ]
const CodeElement = ({ attributes, children }) => (
    <pre {...attributes} className='bg-black text-white'>
        <code>{children}</code>
    </pre>
)
const ProjectElement = ({ attributes, children }) => {
    return (
        <div className='flex' {...attributes}>{children}</div>
    )
}
const YoutubeElement = props => {
    const videoId = props.element.youtubeId;
    const opts = {
        playerVars: {
            autoplay: 1, // Tự động phát khi load
        },
    };
    const [isLite, setIsLite] = useState(true);
    return (
        <div {...props.attributes} onClick={() => setIsLite(false)}>
            {isLite ? (
                <LiteYouTubeEmbed id={videoId} title='video youtube' />
            ) : (
                <YouTube iframeClassName='absolute inset-0 w-full h-full' className='relative w-full aspect-video' videoId={videoId} opts={opts} />
            )}
        </div>
    );
}
const ImageElement = props => (<img className='w-full' {...props.attributes} src={props.element.url} alt={"alt"} />)
const Leaf = props => (
    <span {...props.attributes} style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}>
        {props.children}
    </span>
)
const DefaultElement = props => <p {...props.attributes}>{props.children}</p>
const embedRegexes = [{
    regex: /https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/blog-exam-master\.appspot\.com\/o\/EXAM_FOLDER_([a-zA-Z0-9-]+)\.png\?alt=media/g,
    type: 'image'
}, {
    regex: /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9-]+)/,
    type: 'youtube'
}]
const CustomEditor = {
    handleEmbed(editor, event) {
        const text = event.clipboardData.getData('text/plain')
        event.preventDefault()
        embedRegexes.some(({ regex, type }) => {
            const match = text.match(regex)
            if (match) {
                const embed = { type, children: [{ text: "" }], youtubeId: match[1], url: text }
                Transforms.insertNodes(editor, embed)
                // return true
            } else {
                Transforms.insertText(editor, text)
            }
            // return false
        })
    },
    handlePast(editor, event) {
        CustomEditor.handleEmbed(editor, event)
        console.log("onPaste", event.clipboardData.getData('text/plain'));
    },
    isBoldMarkActive(editor) {
        const marks = Editor.marks(editor)
        return marks ? marks.bold === true : false
    },
    isCodeBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code',
        })
        return !!match
    },
    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        if (isActive) {
            Editor.removeMark(editor, 'bold')
        } else {
            Editor.addMark(editor, 'bold', true)
        }
    },
    toggleCodeBlock(editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor)
        Transforms.setNodes(editor, { type: isActive ? null : 'code' },
            { match: n => Element.isElement(n) && Editor.isBlock(editor, n) })
    }
}
const withEmbeds = (editor) => {
    const { insertData, isInline, isVoid } = editor
    editor.insertData = (data) => {
        return insertData(data)
    }
    return editor
}
const TextEditor = () => {
    const initialValue = useMemo(
        () =>
            JSON.parse(localStorage.getItem('content')) || [
                {
                    type: 'paragraph',
                    children: [{ text: 'A line of text in a paragraph.' }],
                },
            ],
        []
    )
    const [editor] = useState(() => withEmbeds(withReact(createEditor())))
    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            case 'image':
                return <ImageElement {...props} />
            case 'youtube':
                return <YoutubeElement {...props} />
            case 'project':
                return <ProjectElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    return (
        <Slate initialValue={initialValue}
            // onChange={(value) => {
            //     const isAstChange = editor.operations.some(op => op.type === 'set_selection')
            //     if (isAstChange) {
            //         const content = JSON.stringify(value)
            //         localStorage.setItem('content', content)
            //     }
            // }} 
            onChange={value => {
                const isAstChange = editor.operations.some(
                    op => 'set_selection' !== op.type
                )
                if (isAstChange) {
                    // Save the value to Local Storage.
                    const content = JSON.stringify(value)
                    localStorage.setItem('content', content)
                }
            }}

            editor={editor} >
            <div>
                <div className='flex gap-x-2'>
                    <Button type='button' onMouseDown={() => CustomEditor.toggleBoldMark(editor)}><b>B</b></Button>
                    <Button type='button' onMouseDown={() => CustomEditor.toggleBoldMark(editor)}><i>I</i></Button>
                    <Button type='button' onMouseDown={() => CustomEditor.toggleBoldMark(editor)}><u>U</u></Button>
                    <Button type='button' onMouseDown={() => CustomEditor.toggleBoldMark(editor)}><Link /></Button>
                    <Button type='button' onMouseDown={() => CustomEditor.toggleBoldMark(editor)}><FileImage /></Button>
                    <Button type='button' onMouseDown={() => CustomEditor.toggleBoldMark(editor)}><List /></Button>
                    <Button type='button' onMouseDown={() => CustomEditor.toggleBoldMark(editor)}><ListOrdered /></Button>
                    <Button type='button' onMouseDown={() => CustomEditor.toggleCodeBlock(editor)}><SquareTerminal /></Button>
                    <Button type='button' onMouseDown={() => console.log(editor.children)}>S</Button>
                </div>
                <Editable
                    onChange={(value) => { console.log("onChange", value); }}
                    onKeyDown={(e) => {
                        if (!e.ctrlKey) return
                        switch (e.key) {
                            case "`":
                                CustomEditor.toggleCodeBlock(editor)
                                break
                            case "b":
                                CustomEditor.toggleBoldMark(editor)
                                break
                        }
                    }}
                    onPaste={(e) => {
                        CustomEditor.handlePast(editor, e)
                    }}
                    renderLeaf={renderLeaf}
                    renderElement={renderElement}
                    name='Blog' placeholder='Write post' autoFocus
                    className={"h-full text-xl p-2"}
                />
            </div>
        </Slate >
    )
}

export default TextEditor