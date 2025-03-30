import { CustomElement, EditorType, TextEditorAlign, TextEditorBlock, TextEditorList, TextEditorMark } from "@/components/elements/util/TextEditor/TextEditorType";
import { Editor, Element, Range, Transforms } from "slate";
import isUrl from 'is-url'
import imageExtensions from 'image-extensions'
export const isMarkActive = (editor: EditorType, format: TextEditorMark) => {
    try {
        const marks = Editor.marks(editor)
        return marks ? marks[format] === true : false
    } catch (error) {
        console.log(error);
        return false
    }
};

export const toggleMark = (editor: EditorType, format: TextEditorMark) => {
    if (!editor.selection) return;
    const isActive = isMarkActive(editor, format);
    if (isActive) editor.removeMark(format);
    else editor.addMark(format, true);
};

const isAlignFormat = (format: string): format is TextEditorAlign =>
    Object.values(TextEditorAlign).includes(format as TextEditorAlign);

const isListFormat = (format: TextEditorBlock): format is TextEditorList =>
    Object.values(TextEditorList).includes(format as TextEditorList);

export const isBlockActive = (editor: EditorType, format: TextEditorBlock) => {
    const { selection } = editor;
    if (!selection) return false;
    const blockType = isAlignFormat(format) ? "align" : "type";
    try {

        const match = Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: (node) => {
                    return (
                        !Editor.isEditor(node) &&
                        Element.isElement(node) &&
                        node[blockType] === format
                    );
                },
            })
        );
        return !!match?.[0];
    } catch (error) {
        console.log(error);
        return false
    }
    // const match = Array.from(
    //     Editor.nodes(editor, {
    //         at: Editor.unhangRange(editor, selection),
    //         match: (node) => {
    //             return (
    //                 !Editor.isEditor(node) &&
    //                 Element.isElement(node) &&
    //                 node[blockType] === format
    //             );
    //         },
    //     })
    // );
    // return !!match?.[0];
};

export const toggleBlock = (editor: EditorType, format: TextEditorBlock) => {
    const isAlign = isAlignFormat(format);
    const isList = isListFormat(format);
    const isActive = isBlockActive(editor, format);

    let align: TextEditorAlign | undefined;
    let type: string | undefined;

    if (isAlign) {
        align = isActive ? undefined : (format);
    } else {
        type = isActive ? "paragraph" : format;
    }

    Transforms.unwrapNodes(editor, {
        match: (node) => {
            return (
                !Editor.isEditor(node) &&
                Element.isElement(node) &&
                isListFormat(node.type as TextEditorBlock) &&
                !isAlignFormat(format)
            );
        },
    });

    if (!isActive && isList) {
        type = "list-item";
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }

    const newProperties: Partial<Element> = {};
    if (isAlign) newProperties["align"] = align;
    if (type) newProperties["type"] = type;

    Transforms.setNodes<Editor>(editor, newProperties);
}
export const isLinkActive = (editor: EditorType) => {
    try {

        const [link] = Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
        })
        return !!link
    } catch (error) {
        console.log(error);
        return false
    }
    // return !!link
}
export const unwrapLink = (editor: EditorType) => {
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    })
}

const wrapLink = (editor: EditorType, url: string) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link: CustomElement = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}

export const insertLink = (editor: EditorType, url: string) => {
    if (editor.selection) {
        wrapLink(editor, url)
    }
}
export const withInline = (editor: EditorType) => {
    const { insertData, insertText, isInline, isElementReadOnly, isSelectable } =
        editor

    editor.isInline = element =>
        ['link', 'button', 'badge'].includes(element.type) || isInline(element)

    editor.isElementReadOnly = element =>
        element.type === 'badge' || isElementReadOnly(element)

    editor.isSelectable = element =>
        element.type !== 'badge' && isSelectable(element)

    editor.insertText = text => {
        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertText(text)
        }
    }

    editor.insertData = data => {
        const text = data.getData('text/plain')

        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
}
export const withImage = (editor: EditorType) => {
    const { insertData, isVoid } = editor

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }

    editor.insertData = data => {
        const text = data.getData('text/plain')
        const { files } = data

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader()
                const [mime] = file.type.split('/')

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result
                        if (!url) return
                        if (typeof url === "string") insertImage(editor, url)
                        else console.error("Expected a string, but got ArrayBuffer");
                    })

                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
}
export const insertImage = (editor: EditorType, url: string) => {
    const text = { text: '' }
    const image = { type: 'image', url, children: [text] }
    Transforms.insertNodes(editor, image)
    Transforms.insertNodes(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
    })
}
const isImageUrl = (url: string) => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return ext && imageExtensions.includes(ext)
}