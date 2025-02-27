import { TextEditorAlign, TextEditorList, TextEditorMark } from "@/components/elements/util/slate/TextEditorAction";
import { EditorType, ElementKey } from "@/components/elements/util/slate/TextEditorType";
import { Editor, Element, Transforms } from "slate";

export const isMarkActive = (editor: EditorType, format: TextEditorMark) => {
    return !!Editor.marks(editor)?.[format];
};

export const toggleMark = (editor: EditorType, format: TextEditorMark) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) editor.removeMark(format);
    else editor.addMark(format, true);
};

const isAlignFormat = (format: TextEditorAlign) =>
    Object.keys(TextEditorAlign).includes(format);

const isListFormat = (format: TextEditorList) =>
    Object.keys(TextEditorList).includes(format);

export const isBlockActive = (editor: EditorType, format: ElementKey) => {
    const { selection } = editor;
    if (!selection) return false;

    const isAlign = isAlignFormat(format as TextEditorAlign);
    const blockType = isAlign ? "align" : "type";

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
};

export const toggleBlock = (editor: EditorType, format: ElementKey) => {
    const isAlign = isAlignFormat(format as TextEditorAlign);
    const isList = isListFormat(format as TextEditorList);
    const isActive = isBlockActive(editor, format);

    let align: TextEditorAlign | undefined;
    let type: string | undefined;

    if (isAlign) {
        align = isActive ? undefined : (format as TextEditorAlign);
    } else {
        type = isActive ? "paragraph" : format;
    }

    Transforms.unwrapNodes(editor, {
        match: (node) => {
            return (
                !Editor.isEditor(node) &&
                Element.isElement(node) &&
                isListFormat(node.type as TextEditorList) &&
                !isAlignFormat(format as TextEditorAlign)
            );
        },
    });

    if (!isActive && isList) {
        type = "list-item";
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }

    let newProperties: Partial<Element> = {};
    if (isAlign) newProperties["align"] = align;
    if (type) newProperties["type"] = type;

    Transforms.setNodes<Editor>(editor, newProperties);
};