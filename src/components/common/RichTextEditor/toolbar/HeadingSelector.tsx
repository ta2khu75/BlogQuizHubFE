import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";

import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import React from "react";
import { HEADING_OPTIONS } from "@/components/common/RichTextEditor/constants/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Props = {
  tag: string;
};
const HeadingSelector = ({ tag }: Props) => {
  const [editor] = useLexicalComposerContext();
  const onChange = (tag: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () =>
          $createHeadingNode(tag as HeadingTagType)
        );
      }
    });
  };
  return (
    <Select value={tag} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="paragraph" />
      </SelectTrigger>
      <SelectContent>
        {HEADING_OPTIONS.map((option) => (
          <SelectItem key={option.tag} value={option.tag}>
            {option.icon}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default HeadingSelector;
