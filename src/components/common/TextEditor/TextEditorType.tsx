import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code, Highlighter, Italic, List, ListOrdered, Quote, Redo, Strikethrough, Subscript, Superscript, Underline, Undo } from "lucide-react";
import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
export enum TextEditorMark {
    Bold = "bold",
    Italic = "italic",
    Underline = "underline",
    Strikethrough = "strikethrough",
    Superscript = "superscript",
    Subscript = "subscript",
    Highlight = "highlight",
    Code = "code",

}
export enum TextEditorList {
    NumberedList = "numbered-list",
    BulletedList = "bulleted-list",
}
export enum TextEditorAlign {
    LeftAlign = "left",
    CenterAlign = "center",
    RightAlign = "right",
    JustifyAlign = "justify",
}
export enum TextEditorEdit {
    Undo = "undo",
    Redo = "redo",
}
export enum TextEditorFormat {
    BlockQuote = "block-quote",
}
export type TextEditorBlock = TextEditorList | TextEditorAlign | TextEditorFormat;
export const TEXT_EDITS = [
    {
        id: TextEditorEdit.Undo,
        icon: <Undo />,
    },
    {
        id: TextEditorEdit.Redo,
        icon: <Redo />,
    },
]
export const TEXT_MARKS = [
    {
        id: TextEditorMark.Bold,
        icon: <Bold />,
    },
    {
        id: TextEditorMark.Italic,
        icon: <Italic />,
    },
    {
        id: TextEditorMark.Underline,
        icon: <Underline />,
    },
    {
        id: TextEditorMark.Highlight,
        icon: <Highlighter />,
    },
    {
        id: TextEditorMark.Strikethrough,
        icon: <Strikethrough />,
    },
    {
        id: TextEditorMark.Superscript,
        icon: <Superscript />,
    },
    {
        id: TextEditorMark.Subscript,
        icon: <Subscript />,
    },
    {
        id: TextEditorMark.Code,
        icon: <Code />,
    },
];
export const TEXT_BLOCKS = [
    {
        id: TextEditorAlign.LeftAlign,
        icon: <AlignLeft />,
    },
    {
        id: TextEditorAlign.CenterAlign,
        icon: <AlignCenter />,
    },
    {
        id: TextEditorAlign.RightAlign,
        icon: <AlignRight />,
    },
    {
        id: TextEditorAlign.JustifyAlign,
        icon: <AlignJustify />,
    },
    {
        id: TextEditorList.BulletedList,
        icon: <List />,
    },
    {
        id: TextEditorList.NumberedList,
        icon: <ListOrdered />,
    },
    {
        id: TextEditorFormat.BlockQuote,
        icon: <Quote />,
    },
];

export const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6", "paragraph"];


export type EditorType = BaseEditor & ReactEditor & HistoryEditor;
export type CustomText = {
    text: string;
    bold?: boolean;
    underline?: boolean;
    superscript?: boolean;
    subscript?: boolean;
    italic?: boolean;
    code?: boolean;
    highlight?: boolean;
    strikethrough?: boolean;
};

export type CustomElement = {
    type: string;
    children: CustomText[];
    align?: TextEditorAlign;
    url?: string;
};