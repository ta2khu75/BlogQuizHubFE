import { ALIGN_OPTIONS } from "@/components/common/RichTextEditor/constants/align";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ElementFormatType, FORMAT_ELEMENT_COMMAND } from "lexical";
import { AlignLeft } from "lucide-react";
import React from "react";
type Props = {
  alignment: string;
};
const AlignmentSelector = ({ alignment }: Props) => {
  const [editor] = useLexicalComposerContext();
  const onChange = (value: string) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value as ElementFormatType);
  };

  return (
    <Select value={alignment} defaultValue={alignment} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={<AlignLeft />} />
      </SelectTrigger>
      <SelectContent>
        {ALIGN_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.icon}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AlignmentSelector;
