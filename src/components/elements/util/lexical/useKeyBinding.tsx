"use client"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { KEY_ENTER_COMMAND } from "lexical";
import { LOW_PRIORIRTY, RichTextAction } from "@/components/elements/util/slate/TextEditorAction";

export const useKeyBinding = ({
    onAction,
}: {
    onAction: (id: RichTextAction) => void;
}) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editor.registerCommand(
            KEY_ENTER_COMMAND,
            (event) => {
                if (event?.key === "B" && event?.ctrlKey) {
                    onAction(RichTextAction.Bold);
                }
                if (event?.key === "I" && event?.ctrlKey) {
                    onAction(RichTextAction.Italic);
                }
                if (event?.key === "U" && event?.ctrlKey) {
                    onAction(RichTextAction.Underline);
                }
                if (event?.key === "Z" && event?.ctrlKey) {
                    onAction(RichTextAction.Undo);
                }
                if (event?.key === "Y" && event?.ctrlKey) {
                    onAction(RichTextAction.Redo);
                }
                return false;
            },
            LOW_PRIORIRTY
        );
    }, [onAction, editor]);
};