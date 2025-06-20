import { Button } from '@/components/ui/button';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import React, { useRef, useState } from 'react'
import { Link, Unlink } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { getSelected } from '@/components/common/RichTextEditor/plugin/Util';
type Props = {
    isLink?: boolean
}
const LinkPlugin = ({ isLink }: Props) => {
    const [editor] = useLexicalComposerContext();
    const [open, setOpen] = useState(false)
    const linkUrl = useRef<string>("");
    const insertLink = () => {
        if (!linkUrl.current) return;
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl.current);
        setOpen(false)
    };
    const removeLink = () => {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        linkUrl.current = e.target.value;
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Ngăn form bị submit (nếu trong form)
            insertLink(); // Gửi giá trị
        }
    };
    if (isLink) {
        return (
            <Button type='button' onClick={removeLink} variant={getSelected(isLink)}><Unlink /></Button>
        )
    }
    return (

        <TooltipProvider>
            < Tooltip open={open}>
                <TooltipTrigger asChild onClick={() => setOpen(true)}>
                    <Button type='button' variant={getSelected(isLink)}><Link /></Button>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input onChange={onInputChange} onKeyDown={onKeyDown} placeholder="url" />
                        <Button type='button' onClick={() => insertLink()}>Subscribe</Button>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default LinkPlugin