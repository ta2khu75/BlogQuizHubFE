import { $isHeadingNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { $getRoot } from "lexical";

type HeadingItem = {
  id: string;
  tag: string;
  text: string;
};

export const useTableOfContents = () => {
  const [editor] = useLexicalComposerContext();
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const newHeadings: HeadingItem[] = [];
        const nodes = $getRoot().getChildren();

        nodes.forEach((node) => {
          if ($isHeadingNode(node)) {
            const textContent = node.getTextContent();
            const tag = node.getTag();
            const id = `heading-${textContent
              .toLowerCase()
              .replace(/\s+/g, "-")}`;
            console.log("Heading ID:", id, "Tag:", tag, "Text:", textContent);

            newHeadings.push({
              id,
              tag,
              text: textContent,
            });

            // Cập nhật DOM: gắn id vào node DOM để scroll tới được
            const dom = editor.getElementByKey(node.getKey());
            if (dom) {
              dom.id = id;
            }
          }
        });

        setHeadings(newHeadings);
      });
    });
  }, [editor]);

  return headings;
};
