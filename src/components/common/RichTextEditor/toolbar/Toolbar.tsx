// import { LOW_PRIORIRTY } from "@/components/common/RichTextEditor/plugin/Constants";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
  TextFormatType,
} from "lexical";
import { useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import { $isLinkNode } from "@lexical/link";
import { $isHeadingNode } from "@lexical/rich-text";
import ColorPlugin from "@/components/common/RichTextEditor/plugin/ColorPlugin";
import { $isListNode } from "@lexical/list";
import ImagePlugin from "@/components/common/RichTextEditor/plugin/ImagePlugin";
import LinkPlugin from "@/components/common/RichTextEditor/toolbar/LinkEditor";
import HeadingSelector from "@/components/common/RichTextEditor/toolbar/HeadingSelector";
import AlignmentSelector from "@/components/common/RichTextEditor/toolbar/AlignmentSelector";
import ListButtons from "@/components/common/RichTextEditor/toolbar/ListButtons";
import TextFormatButtons from "@/components/common/RichTextEditor/toolbar/TextFormatButtons";
import { TEXT_FORMATS } from "@/components/common/RichTextEditor/constants/textFormat";
import HistoryButtons from "@/components/common/RichTextEditor/toolbar/HistoryButtons";
// import { autoNumberHeadings } from "@/comp/o/nents/common/RichTextEditor/plugin/Util";
const Toolbar = () => {
  const [heading, setHeading] = useState("paragraph");
  const [alignment, setAlignment] = useState("left");
  const [formats, setFormats] = useState<Set<string>>(new Set());
  const [list, setList] = useState<string>();
  const [editor] = useLexicalComposerContext();
  const [disableTypes, setDisableTypes] = useState<Set<string>>(new Set());
  const [isLink, setIsLink] = useState(false);

  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // autoNumberHeadings(editor);
      const anchorNode = selection.anchor.getNode();
      const topNode = anchorNode.getTopLevelElementOrThrow();
      const parentNode = anchorNode.getParent();
      setAlignment(topNode.getFormatType?.() || "left");
      if ($isHeadingNode(topNode)) {
        const headingTag = topNode.getTag();
        setHeading(headingTag);
      } else {
        setHeading("paragraph");
      }

      if ($isListNode(topNode)) {
        setList(topNode.getListType());
      } else {
        setList(undefined);
      }
      setIsLink($isLinkNode(parentNode));
      const formatTexts = new Set<string>();
      for (const x of TEXT_FORMATS) {
        if (selection.hasFormat(x.format as TextFormatType)) {
          formatTexts.add(x.format);
        }
      }
      setFormats(formatTexts);
    }
  };

  const updateSet = (
    prev: Set<string>,
    key: string,
    enable: boolean
  ): Set<string> => {
    const next = new Set(prev);
    if (enable) {
      next.delete(key);
    } else {
      next.add(key);
    }
    return next;
  };

  useEffect(() => {
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),

      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (canUndo) => {
          setDisableTypes((prev) => updateSet(prev, "undo", canUndo));
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),

      editor.registerCommand(
        CAN_REDO_COMMAND,
        (canRedo) => {
          setDisableTypes((prev) => updateSet(prev, "redo", canRedo));
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
    // Force-check undo/redo at start (dirty workaround)
    editor.getEditorState().read(() => {
      editor.dispatchCommand(CAN_UNDO_COMMAND, false);
      editor.dispatchCommand(CAN_REDO_COMMAND, false);
    });

    return unregister; // Cleanup when component unmounts
  }, [editor]);
  return (
    <div>
      <div className="flex flex-wrap gap-1">
        <div>
          <HeadingSelector tag={heading} />
        </div>
        <div>
          <AlignmentSelector alignment={alignment} />
        </div>
        <ListButtons type={list} />
        <TextFormatButtons formats={formats} />
        <ColorPlugin />
        <LinkPlugin isLink={isLink} />
        <ImagePlugin />
        <HistoryButtons disabledTypes={disableTypes} />
      </div>
    </div>
  );
};

export default Toolbar;
