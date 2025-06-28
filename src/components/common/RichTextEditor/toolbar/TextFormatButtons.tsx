import { TEXT_FORMATS } from "@/components/common/RichTextEditor/constants/textFormat";
import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, TextFormatType } from "lexical";
import React from "react";
type Props = {
  formats: Set<string>;
};
const TextFormatButtons = ({ formats }: Props) => {
  const [editor] = useLexicalComposerContext();
  const onClick = (format: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText(format as TextFormatType);
      }
    });
  };
  return (
    <>
      {TEXT_FORMATS.map((item) => (
        <Button
          type="button"
          key={item.format}
          variant={formats.has(item.format) ? "default" : "outline"}
          onClick={() => onClick(item.format)}
        >
          {item.icon}
        </Button>
      ))}
    </>
  );
};

export default TextFormatButtons;
