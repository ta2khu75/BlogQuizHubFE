/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LinkNode } from "@lexical/link";
import { EditorThemeClasses } from "lexical";
import { ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import CustomOnChangePlugin from "@/components/common/RichTextEditor/plugin/CustomOnChangePlugin";
import { ImageNode } from "@/components/common/RichTextEditor/plugin/nodes/ImageNode";
import Toolbar from "@/components/common/RichTextEditor/toolbar/Toolbar";
import TableOfContents from "@/components/common/RichTextEditor/plugin/TableOfContents";
const theme: EditorThemeClasses = {
  heading: {
    h2: "text-5xl",
    h3: "text-4xl",
    h4: "text-3xl",
  },
  list: {
    ul: "list-disc",
    ol: "list-decimal",
  },
  link: "font-medium text-blue-600 dark:text-blue-500 cursor-pointer hover:underline",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    superscript: "sup",
    subscript: "sub",
    highlight: "text-black p-1 bg-yellow-300 border border-yellow-600",
    code: "text-black p-1 text-sm font-mono bg-gray-200",
  },
};
const EMPTY_EDITOR_STATE = JSON.stringify({
  root: {
    children: [
      {
        children: [],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
    ],
    direction: null,
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
});
type Props = {
  value?: any;
  onChangeValue: (value: any) => void;
  placeholder?: string;
  isDebounce?: boolean;
  name: string;
  isReset?: boolean;
  setIsReset?: (value: boolean) => void;
};
const RichTextEditor = ({
  name,
  value,
  isReset,
  setIsReset,
  onChangeValue,
  isDebounce = true,
  placeholder,
}: Props) => {
  const initialConfig = useMemo(
    () => ({
      namespace: name,
      theme,
      onError: (error: any) => {
        console.log(error);
      },
      nodes: [
        HeadingNode,
        CodeHighlightNode,
        CodeNode,
        ListNode,
        ListItemNode,
        ImageNode,
        LinkNode,
      ],
    }),
    [name]
  );
  const finalValue =
    typeof value === "string" && value.trim() !== ""
      ? value
      : EMPTY_EDITOR_STATE;
  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbar />
        {/* <ToolbarPlugin /> */}
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <div className="flex">
                <ContentEditable
                  className={"w-full p-2 min-h-96 border border-gray-400"}
                />
                <TableOfContents />
              </div>
            }
            placeholder={
              <div className="absolute top-2 left-2 text-gray-400">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <CustomOnChangePlugin
          isReset={isReset}
          setIsReset={setIsReset}
          value={finalValue}
          isDebounce={isDebounce}
          onChangeValue={onChangeValue}
        />
        <AutoFocusPlugin />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
      </LexicalComposer>
    </>
  );
};

export default memo(RichTextEditor);
