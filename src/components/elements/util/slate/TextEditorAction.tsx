"use client"
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code, Highlighter, Italic, List, ListOrdered, Quote, Redo, Strikethrough, Subscript, Superscript, Underline, Undo } from "lucide-react";
import { JSX } from "react";
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
// export enum TextEditorBlock {
//     LeftAlign = "left",
//     CenterAlign = "center",
//     RightAlign = "right",
//     JustifyAlign = "justify",
//     // Divider = "divider",
//     // BlockQuote = "block-quote",
//     // NumberedList = "numbered-list",
//     // BulletedList = "bulleted-list",
//     // Undo = "undo",
//     // Redo = "redo",
// }
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
export enum TextEditorEditing {
    Undo = "undo",
    Redo = "redo",
}
export enum TextEditorBlock {
    BlockQuote = "block-quote",
    Divider = "divider",
}
export type TextEditorAction = TextEditorMark | TextEditorList | TextEditorAlign | TextEditorBlock;
// Bold = "bold",
// Italic = "italic",
// Underline = "underline",
// Strikethrough = "strikethrough",
// Superscript = "superscript",
// Subscript = "subscript",
// Highlight = "highlight",
// Code = "code",
// LeftAlign = "left",
// CenterAlign = "center",
// RightAlign = "right",
// JustifyAlign = "justify",
// Divider = "divider",
// BlockQuote = "block-quote",
// NumberedList = "numbered-list",
// BulletedList = "bulleted-list",
// Undo = "undo",
// Redo = "redo",
// }

export const TEXT_FORMATS: { id: TextEditorAction; icon: JSX.Element }[] = [
    {
        id: TextEditorMark.Bold,
        icon: <Bold />,
    },
    {
        id: TextEditorMark.Italic,
        icon: <Italic />,
    },
    {
        id: TextEditorMark.Italic,
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
        id: TextEditorEditing.Undo,
        icon: <Undo />,
    },
    {
        id: TextEditorEditing.Redo,
        icon: <Redo />,
    },
    {
        id: TextEditorBlock.BlockQuote,
        icon: <Quote />,
    },
    {
        id: TextEditorList.BulletedList,
        icon: <List />,
    },
    {
        id: TextEditorList.NumberedList,
        icon: <ListOrdered />,
    },
];

// export const HEADER_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

// export const LIST_TYPES = ["numbered-list", "bulleted-list"];
// export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];