/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import isEqual from "lodash/isEqual";

import useDebounce from "@/hooks/useDebounce";

type Props = {
  value: string;
  isDebounce?: boolean;
  onChangeValue: (value: string) => void;
  setIsReset?: (value: boolean) => void;
  isReset?: boolean;
};

const CustomOnChangePlugin = ({
  value,
  isDebounce,
  isReset,
  setIsReset = () => {},
  onChangeValue,
}: Props) => {
  const [editor] = useLexicalComposerContext();
  const lastRaw = useRef<any>(null);
  const [pendingSerialized, setPendingSerialized] = useState("");

  const debouncedValue = useDebounce(pendingSerialized, 300);

  // Reset editor content từ prop `value`
  useEffect(() => {
    console.log("rich text reset", value);
    console.log("isReset", isReset);

    if (!isReset || typeof value !== "string") return;
console.log("reseted");

    try {
      const parsed = JSON.parse(value);
      const editorState = editor.parseEditorState(parsed);

      editor.update(() => {
        editor.setEditorState(editorState);
      });

      lastRaw.current = parsed;
    } catch (err) {
      console.error("Invalid JSON data:", err);
    } finally {
      setIsReset(false);
    }
  }, [value, editor, isReset, setIsReset]);

  // Gọi hàm onChange sau debounce nếu nội dung thay đổi
  useEffect(() => {
    if (isDebounce && debouncedValue) {
      onChangeValue(debouncedValue);
    }
  }, [debouncedValue, onChangeValue, isDebounce]);

  // Xử lý mỗi khi editor thay đổi
  const onChange = (editorState: EditorState) => {
    const currentRaw = editorState.toJSON();
    const result = isEqual(currentRaw, lastRaw.current);
    if (result) return;
    lastRaw.current = currentRaw;
    const jsonString = JSON.stringify(currentRaw);
    if (isDebounce) {
      setPendingSerialized(jsonString);
    } else {
      onChangeValue(jsonString);
    }
  };

  return <OnChangePlugin onChange={onChange} />;
};

export default CustomOnChangePlugin;
