import { HISTORY_TYPES } from "@/components/common/RichTextEditor/constants/history";
import { getButtonVariant } from "@/components/common/RichTextEditor/plugin/Util";
import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalCommand, REDO_COMMAND, UNDO_COMMAND } from "lexical";
import React from "react";
type Props = {
  disabledTypes: Set<string>;
};
const HistoryButtons = ({ disabledTypes }: Props) => {
  const [editor] = useLexicalComposerContext();
  const onClick = (type: string) => {
    let command: LexicalCommand<void> | null;
    if (type === "undo") {
      command = UNDO_COMMAND;
    } else {
      command = REDO_COMMAND;
    }
    editor.dispatchCommand(command, undefined);
  };
  return (
    <>
      {HISTORY_TYPES.map((item) => (
        <Button
          type="button"
          onClick={() => onClick(item.type)}
          disabled={disabledTypes.has(item.type)}
          variant={getButtonVariant(!disabledTypes.has(item.type))}
          //   disabled={!types.has(item.type)}
          //   variant={getButtonVariant(types.has(item.type))}
          key={item.type}
        >
          {item.icon}
        </Button>
      ))}
    </>
  );
};

export default HistoryButtons;
