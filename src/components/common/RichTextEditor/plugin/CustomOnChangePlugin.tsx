/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import useDebounce from '@/hooks/useDebounce';
import { EditorState } from 'lexical';
type Props = {
  value: string;
  isDebounce?: boolean; // Optional prop to control debouncing
  onChangeValue: (value: string) => void
}
const CustomOnChangePlugin = ({ value, isDebounce, onChangeValue }: Props) => {
  const [editor] = useLexicalComposerContext();
  const hasInitialized = useRef(false);
  const lastSerialized = useRef("");
  const [pendingSerialized, setPendingSerialized] = useState('');

  const debouncedValue = useDebounce(pendingSerialized, 300);
  useEffect(() => {
    if (!value || hasInitialized.current) return;
    try {
      const parsed = JSON.parse(value);
      const editorState = editor.parseEditorState(parsed);
      editor.setEditorState(editorState);
      lastSerialized.current = parsed;
      hasInitialized.current = true;
    } catch (err) {
      console.error('Invalid JSON data:', err);
    }
  }, [value, editor]);
  useEffect(() => {
    if (isDebounce && debouncedValue && debouncedValue !== lastSerialized.current) {
      onChangeValue(debouncedValue);
    }
  }, [debouncedValue, onChangeValue, value, isDebounce]);
  const onChange = (editorState: EditorState) => {
    const jsonString = JSON.stringify(editorState.toJSON());
    if (jsonString === lastSerialized.current) return;
    lastSerialized.current = jsonString;
    if (isDebounce) {
      setPendingSerialized(jsonString);
    } else {
      onChangeValue(jsonString);
    }
  }
  return <OnChangePlugin onChange={onChange} />
}

export default CustomOnChangePlugin