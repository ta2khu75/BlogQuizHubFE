import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code, Highlighter, Italic, Redo, Strikethrough, Subscript, Superscript, Underline, Undo } from "lucide-react";

export enum RichTextAction {
    Bold = "bold",
    Italic = "italic",
    Underline = "underline",
    Strikethrough = "strikethrough",
    Superscript = "superscript",
    Subscript = "subscript",
    Highlight = "highlight",
    Code = "code",
    LeftAlign = "leftAlign",
    CenterAlign = "centerAlign",
    RightAlign = "rightAlign",
    JustifyAlign = "justifyAlign",
    Divider = "divider",
    Undo = "undo",
    Redo = "redo",
}

export const RICH_TEXT_OPTIONS = [
    { id: RichTextAction.Bold, icon: <Bold />, label: "Bold" },
    { id: RichTextAction.Italic, icon: <Italic />, label: "Italic" },
    { id: RichTextAction.Underline, icon: <Underline />, label: "Underline" },
    { id: RichTextAction.Divider },
    {
        id: RichTextAction.Highlight,
        icon: <Highlighter />,
        label: "Highlight",
        fontSize: 10,
    },
    {
        id: RichTextAction.Strikethrough,
        icon: <Strikethrough />,
        label: "Strikethrough",
    },
    {
        id: RichTextAction.Superscript,
        icon: <Superscript />,
        label: "Superscript",
    },
    {
        id: RichTextAction.Subscript,
        icon: <Subscript />,
        label: "Subscript",
    },
    {
        id: RichTextAction.Code,
        icon: <Code />,
        label: "Code",
    },
    { id: RichTextAction.Divider },
    {
        id: RichTextAction.LeftAlign,
        icon: <AlignLeft />,
        label: "Align Left",
    },
    {
        id: RichTextAction.CenterAlign,
        icon: <AlignCenter />,
        label: "Align Center",
    },
    {
        id: RichTextAction.RightAlign,
        icon: <AlignRight />,
        label: "Align Right",
    },
    {
        id: RichTextAction.JustifyAlign,
        icon: <AlignJustify />,
        label: "Align Justify",
    },

    { id: RichTextAction.Divider },
    {
        id: RichTextAction.Undo,
        icon: <Undo />,
        label: "Undo",
    },
    {
        id: RichTextAction.Redo,
        icon: <Redo />,
        label: "Redo",
    },
];

export const LOW_PRIORIRTY = 1;
export const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6", "paragraph"];