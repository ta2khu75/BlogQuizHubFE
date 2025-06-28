import { LIST_TYPES } from "@/components/common/RichTextEditor/constants/list";
import { Button } from "@/components/ui/button";
import { $getSelection, $isRangeSelection } from "lexical";
import React from "react";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
type Props = {
  type?: string;
};
const ListButtons = ({ type }: Props) => {
  const [editor] = useLexicalComposerContext();
  const onClick = (list: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (list === "bullet" && type !== "bullet") {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else if (list === "number" && type !== "number") {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        } else {
          editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
      }
    });
  };

  //   editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, type);
  return (
    <>
      {LIST_TYPES.map((item) => (
        <Button
          type="button"
          key={item.type}
          variant={item.type === type ? "default" : "outline"}
          onClick={() => onClick(item.type)}
        >
          {item.icon}
        </Button>
      ))}
    </>
  );
};

export default ListButtons;
