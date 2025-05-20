import React, { useEffect, useState } from 'react'
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html"
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $insertNodes } from 'lexical';
type Props = {
  value: string;
  onChange: (value: string) => void
}
const CustomOnChangePlugin = ({ value, onChange }: Props) => {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true)
  useEffect(() => {
    if (!value || !isFirstRender) return
    setIsFirstRender(false)
    editor.update(() => {
      const currentHtml = $generateHtmlFromNodes(editor);
      if (currentHtml !== value) {
        $getRoot().clear();
        const parser = new DOMParser();
        const dom = parser.parseFromString(value, "text/html")
        const nodes = $generateNodesFromDOM(editor, dom);
        $insertNodes(nodes)
      }
    })
  }, [editor, value, isFirstRender])
  return <OnChangePlugin onChange={editorState => {
    editorState.read(() => {
      onChange($generateHtmlFromNodes(editor))
    })
  }} />

}

export default CustomOnChangePlugin