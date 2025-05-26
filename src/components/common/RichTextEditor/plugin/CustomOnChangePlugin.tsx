/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
type Props = {
  value: any;
  onChange: (value: any) => void
}
const CustomOnChangePlugin = ({ value, onChange }: Props) => {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true)
  useEffect(() => {
    console.log("default value", value);
    if (!value || !isFirstRender) return
    setIsFirstRender(false)
    editor.update(() => {
      if (!value) return;

      const isValidState =
        value &&
        typeof value === "object" &&
        value?.root?.type === "root";

      if (!isValidState) return;
      try {
        const parsedEditorState = editor.parseEditorState(value);
        editor.setEditorState(parsedEditorState);
      } catch (error) {
        console.error("Failed to parse or set editor state:", error);
      }
    })
  }, [editor, value, isFirstRender])
  return <OnChangePlugin onChange={editorState => {
    onChange(editorState.toJSON())
  }} />

}

export default CustomOnChangePlugin