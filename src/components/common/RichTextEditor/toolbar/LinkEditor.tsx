import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import React, { useRef, useState } from "react";
import { Link, Unlink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  getButtonVariant,
  isValidUrl,
} from "@/components/common/RichTextEditor/plugin/Util";
type Props = {
  isLink?: boolean;
};
const LinkEditor = ({ isLink }: Props) => {
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const linkUrl = useRef<string>("");
  const insertLink = () => {
    if (!linkUrl.current) return;
    if (!isValidUrl(linkUrl.current)) {
      setError("Invalid URL");
      return;
    }
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl.current);
    setOpen(false);
  };
  const removeLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    linkUrl.current = e.target.value;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn form bị submit (nếu trong form)
      insertLink(); // Gửi giá trị
    }
  };
  if (isLink) {
    return (
      <Button
        type="button"
        onClick={removeLink}
        variant={getButtonVariant(isLink)}
      >
        <Unlink />
      </Button>
    );
  }
  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger
          asChild
          onClick={() => {
            setOpen((prev) => !prev);
            setError(undefined);
          }}
        >
          <Button type="button" variant={getButtonVariant(isLink)}>
            <Link />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <div>
              <Input
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                placeholder="url"
              />
              <p className="text-destructive">{error}</p>
            </div>
            <Button type="button" onClick={() => insertLink()}>
              Subscribe
            </Button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LinkEditor;
// import {
//   $createLinkNode,
//   $isLinkNode,
//   TOGGLE_LINK_COMMAND,
// } from "@lexical/link";
// import {
//   $getSelection,
//   $isRangeSelection,
//   SELECTION_CHANGE_COMMAND,
//   COMMAND_PRIORITY_LOW,
// } from "lexical";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";

// const LinkEditor = () => {
//   const [editor] = useLexicalComposerContext();
//   const [url, setUrl] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLink, setIsLink] = useState(false);

//   // Cập nhật trạng thái URL khi selection thay đổi
//   useEffect(() => {
//     return editor.registerCommand(
//       SELECTION_CHANGE_COMMAND,
//       () => {
//         editor.getEditorState().read(() => {
//           const selection = $getSelection();
//           if ($isRangeSelection(selection)) {
//             const node = selection.anchor.getNode().getParent();
//             if ($isLinkNode(node)) {
//               setIsLink(true);
//               setUrl(node.getURL());
//             } else {
//               setIsLink(false);
//               setUrl("");
//             }
//           }
//         });
//         return false;
//       },
//       COMMAND_PRIORITY_LOW
//     );
//   }, [editor]);

//   const applyLink = () => {
//     editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
//     setIsEditing(false);
//   };

//   const removeLink = () => {
//     editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
//     setUrl("");
//     setIsEditing(false);
//   };

//   return (
//     <div className="flex items-center gap-2">
//       {isEditing ? (
//         <>
//           <Input
//             className="w-48"
//             placeholder="https://example.com"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//           />
//           <Button size="sm" onClick={applyLink}>
//             Apply
//           </Button>
//           {isLink && (
//             <Button variant="destructive" size="sm" onClick={removeLink}>
//               Remove
//             </Button>
//           )}
//         </>
//       ) : (
//         <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
//           {isLink ? "Edit Link" : "Insert Link"}
//         </Button>
//       )}
//     </div>
//   );
// };

// export default LinkEditor;
