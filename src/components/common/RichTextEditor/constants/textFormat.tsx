import {
  Bold,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from "lucide-react";

// constants/textFormat.ts
export const TEXT_FORMATS = [
  { format: "bold", label: "Bold", icon: <Bold /> },
  { format: "italic", label: "Italic", icon: <Italic /> },
  { format: "underline", label: "Underline", icon: <Underline /> },
  { format: "strikethrough", label: "Strikethrough", icon: <Strikethrough /> },
  { format: "superscript", label: "Superscript", icon: <Superscript /> },
  { format: "subscript", label: "Subscript", icon: <Subscript /> },
];
