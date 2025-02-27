import { TextEditorAlign, TextEditorBlock, TextEditorList } from "@/components/elements/util/slate/TextEditorAction";
import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

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

// export type MarkKey =
//     | .Bold
//     | TextEditorAction.Italic
//     | TextEditorAction.Underline
// | TextEditorAction.
// | "superscript"
// | "subscript"
// | "italic"
// | "code"
// | "highlight"
// | "strikethrough";
// export type AlignKey = TextEditorAction.LeftAlign | TextEditorAction.RightAlign | TextEditorAction.CenterAlign | TextEditorAction.JustifyAlign;
//  "left" | "right" | "center" | "justify";

export type CustomElement = {
    type: string;
    children: CustomText[];
    align?: TextEditorAlign;
};


export type ElementKey = TextEditorAlign | TextEditorList | TextEditorBlock;
//     | AlignKey | TextEditorAction.BlockQuote
//     | TextEditorAction.NumberedList
//     | TextEditorAction.BulletedList
// | TextEditorAction.ListItem;
// | "block-quote"
// | "numbered-list"
// | "bulleted-list"
// | "list-item";