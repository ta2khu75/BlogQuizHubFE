import ColorPicker from '@/components/common/ColorPicker'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND } from 'lexical'
import { $patchStyleText, $getSelectionStyleValueForProperty } from '@lexical/selection'
import { Baseline, PaintBucket } from 'lucide-react'
import { mergeRegister } from "@lexical/utils"
import React, { useEffect, useState } from 'react'
import { LOW_PRIORIRTY } from '@/components/common/RichTextEditor/plugin/Constants'

const ColorPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [{ color, bgColor }, setColors] = useState({ color: '#000', bgColor: '#fff' })
    const updateColor = ({ property, color }: { property: "background" | "color", color: string }) => {
        editor.update(() => {
            const selection = $getSelection()
            if (selection) $patchStyleText(selection, { [property]: color })
        })
    }
    const updateToolbar = () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const color = $getSelectionStyleValueForProperty(selection, "color", "#000")
            const bgColor = $getSelectionStyleValueForProperty(selection, "background", "#fff")
            setColors({ color, bgColor })
        }
    }
    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateToolbar()
                })
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                () => {
                    updateToolbar();
                    return false;
                },
                LOW_PRIORIRTY
            )
        )
    }, [])
    return (
        <>
            <ColorPicker color={color} style={{ border: `4px solid ${color}` }} icon={<Baseline />} onChange={(color) => updateColor({ property: "color", color })} />
            <ColorPicker color={bgColor} style={{ border: `4px solid ${bgColor}` }} icon={<PaintBucket />} onChange={(color) => updateColor({ property: "background", color })} />
        </>
    )
}

export default ColorPlugin